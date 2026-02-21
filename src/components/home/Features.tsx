'use client';

import { Mic, Zap, Users, Calendar, Globe, TrendingUp, Sparkles } from 'lucide-react';
import { Card } from '../ui/Card';
import { motion } from 'framer-motion';

export const Features = () => {
  const features = [
    {
      icon: Mic,
      title: 'Voice-First Planning',
      description: 'Plan entire trips using natural voice commands. Just speak your destination and preferences.',
      gradient: 'from-blue-500 via-blue-600 to-cyan-600',
      iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-500',
      glowColor: 'shadow-blue-500/50',
    },
    {
      icon: Zap,
      title: 'Instant Itineraries',
      description: 'Get personalized travel plans in seconds, optimized for your schedule and interests.',
      gradient: 'from-yellow-500 via-orange-500 to-red-500',
      iconBg: 'bg-gradient-to-br from-yellow-500 to-orange-500',
      glowColor: 'shadow-yellow-500/50',
    },
    {
      icon: Users,
      title: 'Group Collaboration',
      description: 'Plan trips together with friends and family. Real-time updates and shared preferences.',
      gradient: 'from-green-500 via-emerald-500 to-teal-600',
      iconBg: 'bg-gradient-to-br from-green-500 to-emerald-500',
      glowColor: 'shadow-green-500/50',
    },
    {
      icon: Calendar,
      title: 'Smart Scheduling',
      description: 'AI-powered scheduling that adapts to flight delays, weather, and real-time conditions.',
      gradient: 'from-purple-500 via-violet-500 to-indigo-600',
      iconBg: 'bg-gradient-to-br from-purple-500 to-indigo-500',
      glowColor: 'shadow-purple-500/50',
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Access recommendations for destinations worldwide with local insights and hidden gems.',
      gradient: 'from-pink-500 via-rose-500 to-red-600',
      iconBg: 'bg-gradient-to-br from-pink-500 to-rose-500',
      glowColor: 'shadow-pink-500/50',
    },
    {
      icon: TrendingUp,
      title: 'Learn & Improve',
      description: 'Our AI learns from your trips to provide better recommendations over time.',
      gradient: 'from-orange-500 via-amber-500 to-yellow-600',
      iconBg: 'bg-gradient-to-br from-orange-500 to-amber-500',
      glowColor: 'shadow-orange-500/50',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6 border border-blue-200 dark:border-blue-800"
          >
            <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400 animate-pulse" />
            <span className="text-sm font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              POWERFUL FEATURES
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-extrabold mb-6">
            <span className="text-gray-900 dark:text-white">Everything You Need</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              For Perfect Travel
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Powerful features designed to make travel planning effortless, intelligent, and enjoyable
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="group"
            >
              <Card hover className="p-8 h-full relative overflow-hidden border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                {/* Gradient Background on Hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                {/* Animated Icon */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="relative mb-6"
                >
                  <div className={`w-16 h-16 rounded-2xl ${feature.iconBg} flex items-center justify-center shadow-xl ${feature.glowColor} group-hover:shadow-2xl transition-shadow duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  {/* Glow Effect */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} blur-xl opacity-0 group-hover:opacity-30`}
                  />
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative Corner */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`} />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};