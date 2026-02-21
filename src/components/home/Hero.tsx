'use client';

import Link from 'next/link';
import { ArrowRight, Mic, Sparkles, Plane, MapPin, Calendar, Star } from 'lucide-react';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-blue-950 dark:via-purple-950 dark:to-pink-950">
        {/* Animated Grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-3xl opacity-30"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            x: [0, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl opacity-30"
        />
        <motion.div
          animate={{
            y: [0, -40, 0],
            x: [0, 30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full blur-3xl opacity-30"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Floating Icons */}
          <div className="flex justify-center mb-10 space-x-6">
            {[
              { Icon: Plane, color: 'from-blue-500 to-cyan-500', delay: 0 },
              { Icon: MapPin, color: 'from-purple-500 to-pink-500', delay: 0.2 },
              { Icon: Calendar, color: 'from-orange-500 to-red-500', delay: 0.4 },
            ].map(({ Icon, color, delay }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay }}
                whileHover={{ scale: 1.2, rotate: 360 }}
              >
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                  className={`p-4 bg-gradient-to-br ${color} rounded-3xl shadow-2xl`}
                >
                  <Icon className="h-8 w-8 text-white" />
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center space-x-3 bg-white dark:bg-gray-800 px-8 py-4 rounded-full mb-10 shadow-2xl border border-gray-200 dark:border-gray-700"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-6 w-6 text-yellow-500" />
            </motion.div>
            <span className="text-base font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI-Powered Travel Planning • Voice-First Experience
            </span>
            <div className="flex -space-x-1">
              {[...Array(3)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              ))}
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight"
          >
            <span className="text-gray-900 dark:text-white">Plan Your </span>
            <span className="relative inline-block">
              <motion.span
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{
                  backgroundSize: '200% 200%',
                }}
                className="bg-gradient-to-r from-blue-600 via-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent"
              >
                Perfect Trip
              </motion.span>
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 blur-3xl opacity-30"
              />
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">With </span>
            <span className="relative inline-block">
              <motion.span
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"
              >
                Your Voice
              </motion.span>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-2 -right-2"
              >
                <Mic className="h-12 w-12 text-orange-500" />
              </motion.div>
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-14 max-w-4xl mx-auto leading-relaxed font-medium"
          >
            Experience revolutionary travel planning with{' '}
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
              AI-powered voice interaction
            </span>
            ,{' '}
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              intelligent recommendations
            </span>
            , and adaptive itineraries
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20"
          >
            <Link href="/signup">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="primary"
                  className="group text-lg px-10 py-6 shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/70 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <span className="mr-3 font-bold">Get Started Free</span>
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </Button>
              </motion.div>
            </Link>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="group text-lg px-10 py-6 border-3 shadow-xl hover:shadow-2xl bg-white dark:bg-gray-800"
              >
                <Mic className="mr-3 h-6 w-6 group-hover:scale-125 transition-transform text-orange-600" />
                <span className="font-bold">Try Voice Demo</span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              { value: '10K+', label: 'Happy Travelers', gradient: 'from-blue-600 to-cyan-600', icon: '👥' },
              { value: '50K+', label: 'Trips Planned', gradient: 'from-purple-600 to-pink-600', icon: '✈️' },
              { value: '4.9/5', label: 'User Rating', gradient: 'from-orange-600 to-red-600', icon: '⭐' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8, scale: 1.05 }}
                className="relative group"
              >
                <div className="p-8 bg-white dark:bg-gray-800 backdrop-blur-xl rounded-3xl border-2 border-gray-200 dark:border-gray-700 shadow-xl group-hover:shadow-2xl transition-all duration-300">
                  <div className="text-5xl mb-3">{stat.icon}</div>
                  <div className={`text-5xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-3`}>
                    {stat.value}
                  </div>
                  <div className="text-base text-gray-600 dark:text-gray-400 font-semibold">
                    {stat.label}
                  </div>
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-300`}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-8 h-14 border-3 border-gray-400 dark:border-gray-600 rounded-full flex justify-center p-2">
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-4 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};