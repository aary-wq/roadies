'use client';

import { Mic, Sparkles, MapPin, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const HowItWorks = () => {
  const steps = [
    {
      icon: Mic,
      title: 'Speak Your Plans',
      description:
        'Tell us where you want to go, when, and what you like to do. Use your voice or type.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Sparkles,
      title: 'AI Creates Itinerary',
      description:
        'Our intelligent system generates a personalized travel plan tailored to your preferences.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: MapPin,
      title: 'Explore & Customize',
      description:
        'Review your itinerary, make adjustments, and discover hidden gems along the way.',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: CheckCircle,
      title: 'Travel & Enjoy',
      description:
        'Your trip adapts in real-time to changes. Focus on making memories, we handle the rest.',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Four simple steps to your perfect travel experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[60%] w-full h-0.5 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-700 dark:to-gray-800"></div>
              )}

              <div className="relative z-10 text-center">
                <div
                  className={`mx-auto w-24 h-24 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-lg`}
                >
                  <step.icon className="h-12 w-12 text-white" />
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <div className="text-sm font-semibold text-primary-600 dark:text-primary-400 mb-2">
                    Step {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};