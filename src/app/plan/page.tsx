'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TransportFilter from '../../components/trip/TransportFilter';
import TransportSelection from '../../components/trip/TransportSelection';
import TouristSpotSelection from '../../components/trip/TouristSpotSelection';
import ItineraryDisplay from '../../components/trip/ItineraryDisplay';
export default function PlanPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tripId = searchParams.get('tripId');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [trip, setTrip] = useState<any>(null);
  const [filteredTransport, setFilteredTransport] = useState<any[]>([]);
  const [selectedTransport, setSelectedTransport] = useState<any>(null);
  const [selectedSpots, setSelectedSpots] = useState<string[]>([]);
  const [itinerary, setItinerary] = useState<any[]>([]);
  const [costs, setCosts] = useState({
    transport: 0,
    accommodation: 0,
    food: 0,
    attractions: 0,
    total: 0,
  });
  const [saving, setSaving] = useState(false);

  // Fetch trip data
  useEffect(() => {
    if (!tripId) {
      console.error('No trip ID found');
      setError('No trip ID provided');
      setLoading(false);
      return;
    }

    fetchTripData();
  }, [tripId]);

  const fetchTripData = async () => {
    try {
      setLoading(true);
      setError('');
      console.log('🔍 Fetching trip:', tripId);

      const res = await fetch(`/api/trips/${tripId}`);
      console.log('Response status:', res.status);

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log('📦 Trip data received:', data);

      if (data.success && data.trip) {
        console.log('✅ Trip loaded successfully');
        console.log('Transport options:', data.trip.transportOptions?.length);
        console.log('Tourist spots:', data.trip.allTouristSpots?.length);

        setTrip(data.trip);
        setFilteredTransport(data.trip.transportOptions || []);
        setSelectedTransport(data.trip.selectedTransport || null);
        setSelectedSpots(data.trip.selectedTouristSpots || []);
        setItinerary(data.trip.itinerary || []);

        setCosts({
          transport: data.trip.costs?.transport || 0,
          accommodation: data.trip.costs?.accommodation || 0,
          food: data.trip.costs?.food || 0,
          attractions: data.trip.costs?.attractions || 0,
          total: data.trip.costs?.total || 0,
        });
      } else {
        throw new Error('Invalid trip data received');
      }
    } catch (error: any) {
      console.error('❌ Error fetching trip:', error);
      setError(error.message || 'Failed to load trip');
    } finally {
      setLoading(false);
    }
  };

  // Handle transport filter
  const handleFilterChange = (filters: any) => {
    if (!trip) return;

    console.log('🔧 Applying filters:', filters);
    let filtered = [...trip.transportOptions];

    if (filters.budget) {
      filtered = filtered.filter(
        opt => opt.price * 2 * trip.travelers <= filters.budget
      );
    }

    if (filters.modes && filters.modes.length > 0) {
      filtered = filtered.filter(opt => filters.modes.includes(opt.mode));
    }

    if (filters.maxDuration) {
      filtered = filtered.filter(opt => opt.duration <= filters.maxDuration);
    }

    if (filters.sortBy === 'price') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'duration') {
      filtered.sort((a, b) => a.duration - b.duration);
    }

    console.log(`Filtered: ${filtered.length} options`);
    setFilteredTransport(filtered);
  };

  // Handle transport selection
  const handleSelectTransport = async (option: any) => {
    try {
      console.log('🚗 Selecting transport:', option);

      const res = await fetch(`/api/trips/${tripId}/transport`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transportOption: option }),
      });

      const data = await res.json();

      if (data.success) {
        setSelectedTransport(option);
        setCosts(data.costs);
        console.log('✅ Transport selected, new costs:', data.costs);
      } else {
        console.error('Failed to select transport:', data);
        alert('Failed to select transport');
      }
    } catch (error) {
      console.error('Error selecting transport:', error);
      alert('Failed to select transport');
    }
  };

  const handleDeselectTransport = async () => {
    try {
      console.log('🚫 Deselecting transport');

      const res = await fetch(`/api/trips/${tripId}/transport`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (data.success) {
        setSelectedTransport(null);
        setCosts(data.costs);
        console.log('✅ Transport deselected');
      } else {
        console.error('Failed to deselect transport:', data);
        alert('Failed to deselect transport');
      }
    } catch (error) {
      console.error('Error deselecting transport:', error);
      alert('Failed to deselect transport');
    }
  };

  // Handle spot selection
  const handleToggleSpot = async (spotName: string) => {
    const newSelected = selectedSpots.includes(spotName)
      ? selectedSpots.filter(s => s !== spotName)
      : [...selectedSpots, spotName];

    console.log('🏖️ Toggling spot:', spotName);
    console.log('New selection:', newSelected);

    try {
      const res = await fetch(`/api/trips/${tripId}/spots`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selectedSpots: newSelected }),
      });

      const data = await res.json();

      if (data.success) {
        setSelectedSpots(newSelected);
        setItinerary(data.itinerary);
        setCosts(data.costs);
        console.log('✅ Spots updated');
      } else {
        console.error('Failed to update spots:', data);
        alert('Failed to update spots');
      }
    } catch (error) {
      console.error('Error updating spots:', error);
      alert('Failed to update spots');
    }
  };

  // Handle save trip
  const handleSaveTrip = async () => {
    try {
      setSaving(true);
      console.log('💾 Saving trip:', tripId);

      const res = await fetch(`/api/trips/${tripId}/save`, {
        method: 'POST',
      });

      const data = await res.json();

      if (data.success) {
        alert('Trip saved successfully! ✅');
        router.push('/dashboard');
      } else {
        console.error('Failed to save trip:', data);
        alert('Failed to save trip');
      }
    } catch (error) {
      console.error('Error saving trip:', error);
      alert('Failed to save trip');
    } finally {
      setSaving(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading your trip...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Trip</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  // No trip found
  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">Trip not found</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const days = Math.ceil(
    (new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) /
      (1000 * 60 * 60 * 24)
  ) + 1;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/')}
            className="text-blue-600 hover:text-blue-700 mb-4 flex items-center gap-2 transition"
          >
            ← Back to Home
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {trip.source} → {trip.destination}
          </h1>
          <p className="text-gray-600">
            {new Date(trip.startDate).toLocaleDateString()} -{' '}
            {new Date(trip.endDate).toLocaleDateString()} • {days} days •{' '}
            {trip.travelers} traveler{trip.travelers > 1 ? 's' : ''}
          </p>
        </div>

        {/* Debug Info (Remove in production) */}
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm">
          <p className="font-semibold mb-2">Debug Info:</p>
          <p>Transport Options: {filteredTransport.length}</p>
          <p>Tourist Spots: {trip.allTouristSpots?.length || 0}</p>
          <p>Selected Spots: {selectedSpots.length}</p>
        </div>

        {/* Cost Summary */}
        <div className="mb-8 bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Estimated Cost Breakdown
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <p className="text-sm text-gray-600">Transport</p>
              <p className="text-2xl font-bold text-gray-900">₹{costs.transport}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Accommodation</p>
              <p className="text-2xl font-bold text-gray-900">₹{costs.accommodation}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Food</p>
              <p className="text-2xl font-bold text-gray-900">₹{costs.food}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Attractions</p>
              <p className="text-2xl font-bold text-gray-900">₹{costs.attractions}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-600 font-medium">TOTAL</p>
              <p className="text-3xl font-bold text-blue-900">₹{costs.total}</p>
            </div>
          </div>
        </div>

        {/* Transport Section */}
        {filteredTransport.length > 0 ? (
          <div className="mb-8">
            <div className="grid lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <TransportFilter onFilterChange={handleFilterChange} />
              </div>
              <div className="lg:col-span-3">
                <TransportSelection
                  options={filteredTransport}
                  selectedTransport={selectedTransport}
                  onSelect={handleSelectTransport}
                  onDeselect={handleDeselectTransport}
                  travelers={trip.travelers}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <p className="text-yellow-800">
              ⚠️ No transport options available. This might be due to API limits or invalid route.
            </p>
          </div>
        )}

        {/* Tourist Spots Section */}
        {trip.allTouristSpots && trip.allTouristSpots.length > 0 ? (
          <div className="mb-8">
            <TouristSpotSelection
              spots={trip.allTouristSpots}
              selectedSpots={selectedSpots}
              onToggleSpot={handleToggleSpot}
              maxDays={days}
            />
          </div>
        ) : (
          <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <p className="text-yellow-800">
              ⚠️ No tourist spots found. This might be due to API limits or invalid destination.
            </p>
          </div>
        )}

        {/* Itinerary Section */}
        <div>
          <ItineraryDisplay
            itinerary={itinerary}
            onSaveTrip={handleSaveTrip}
            isSaving={saving}
          />
        </div>
      </div>
    </div>
  );
}