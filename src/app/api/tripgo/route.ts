import { NextRequest, NextResponse } from 'next/server';
import { buildTransitRoute } from '../../../lib/mumbai-transit';

const OSRM_BASE = 'https://router.project-osrm.org/route/v1';

async function getOSRMRoute(fromLat: number, fromLng: number, toLat: number, toLng: number, profile: string) {
    const url = `${OSRM_BASE}/${profile}/${fromLng},${fromLat};${toLng},${toLat}?overview=full&steps=true&geometries=geojson`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.code !== 'Ok' || !data.routes?.[0]) return null;

    const route = data.routes[0];
    const leg = route.legs[0];

    const steps = (leg.steps || [])
        .filter((s: any) => s.distance > 20 || s.maneuver?.type === 'depart' || s.maneuver?.type === 'arrive')
        .map((s: any) => ({
            instruction: s.maneuver?.type === 'depart' ? 'Start' : s.maneuver?.type === 'arrive' ? 'Arrive' :
                `${(s.maneuver?.modifier || s.maneuver?.type || '').replace(/^./, (c: string) => c.toUpperCase())} on ${s.name || 'road'}`,
            distance: Math.round(s.distance),
            duration: Math.round(s.duration),
        }));

    return { totalDistance: Math.round(route.distance), totalDuration: Math.round(route.duration), steps };
}

const MODE_META: Record<string, { name: string; color: string; icon: string; osrm: string }> = {
    drive: { name: 'Drive', color: '#C75B39', icon: 'car', osrm: 'driving' },
    walk: { name: 'Walk', color: '#8B6D47', icon: 'walk', osrm: 'foot' },
    bicycle: { name: 'Bicycle', color: '#40C9B0', icon: 'bike', osrm: 'cycling' },
    auto: { name: 'Auto', color: '#E8842A', icon: 'auto', osrm: 'driving' },
};

export async function POST(req: NextRequest) {
    try {
        const { fromLat, fromLng, toLat, toLng, modes } = await req.json();
        if (!fromLat || !fromLng || !toLat || !toLng) {
            return NextResponse.json({ error: 'Coordinates required' }, { status: 400 });
        }

        const requestedModes: string[] = modes || ['transit', 'drive', 'walk', 'bicycle'];
        const results: any[] = [];

        // Fetch OSRM routes in parallel
        const osrmModes = requestedModes.filter(m => m !== 'transit');
        const osrmPromises = osrmModes.map(async (mode) => {
            const meta = MODE_META[mode];
            if (!meta) return null;
            const data = await getOSRMRoute(fromLat, fromLng, toLat, toLng, meta.osrm);
            if (!data) return null;
            return {
                type: 'single',
                mode,
                modeName: meta.name,
                modeColor: meta.color,
                modeIcon: meta.icon,
                ...data,
            };
        });

        const osrmResults = (await Promise.allSettled(osrmPromises))
            .filter((r): r is PromiseFulfilledResult<any> => r.status === 'fulfilled' && r.value !== null && r.value !== undefined)
            .map(r => r.value);
        results.push(...osrmResults);

        // Transit routes (multi-modal)
        if (requestedModes.includes('transit')) {
            const transitRoutes = buildTransitRoute(fromLat, fromLng, toLat, toLng);
            transitRoutes.forEach((tr, i) => {
                results.push({
                    type: 'transit',
                    mode: `transit-${i}`,
                    modeName: 'Transit',
                    modeColor: '#1a73e8',
                    modeIcon: 'train',
                    totalDistance: Math.round(tr.totalDistance),
                    totalDuration: tr.totalDuration * 60, // convert to seconds
                    departureTime: tr.departureTime,
                    arrivalTime: tr.arrivalTime,
                    summary: tr.summary,
                    linesBadges: tr.linesBadges,
                    legs: tr.legs,
                });
            });
        }

        if (results.length === 0) {
            return NextResponse.json({ error: 'No routes found' }, { status: 404 });
        }

        return NextResponse.json({ routes: results });
    } catch (error: any) {
        console.error('Route error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
