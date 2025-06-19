import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Play, Sparkles, Users, BarChart, Zap, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  title?: string;
  subtitle?: {
    regular: string;
    gradient: string;
  };
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  bottomImage?: {
    light: string;
    dark: string;
  };
  gridOptions?: {
    angle?: number;
    opacity?: number;
    cellSize?: number;
    lightLineColor?: string;
    darkLineColor?: string;
  };
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title = "",
  subtitle = {
    regular: "Transform your digital presence with ",
    gradient: "AI-powered brand analytics"
  },
  description = "Get a comprehensive audit of your personal brand across platforms in minutes. Discover what's working, what's not, and how to improve.",
  ctaText = "Start Free Audit",
  ctaHref = "/audit",
  secondaryCtaText = "Learn More",
  secondaryCtaHref = "/learn-more",
  bottomImage,
  gridOptions = {
    angle: 65,
    opacity: 0.3,
    cellSize: 50,
    lightLineColor: "#6366f1",
    darkLineColor: "#4f46e5",
  }
}) => {
  const stats = [
    { icon: Users, value: "10K+", label: "Professionals Analyzed" },
    { icon: BarChart, value: "95%", label: "Accuracy Rate" },
    { icon: Zap, value: "<2min", label: "Analysis Time" },
    { icon: Star, value: "4.9/5", label: "User Rating" }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30 pt-0">
      {/* Extended background that covers navbar area */}
      <div className="absolute inset-0 -top-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      
      {/* Animated Grid Background */}
      <div 
        className="absolute inset-0 -top-20 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(${gridOptions.angle}deg, transparent 24%, ${gridOptions.lightLineColor} 25%, ${gridOptions.lightLineColor} 26%, transparent 27%, transparent 74%, ${gridOptions.darkLineColor} 75%, ${gridOptions.darkLineColor} 76%, transparent 77%, transparent),
            linear-gradient(${gridOptions.angle - 90}deg, transparent 24%, ${gridOptions.lightLineColor} 25%, ${gridOptions.lightLineColor} 26%, transparent 27%, transparent 74%, ${gridOptions.darkLineColor} 75%, ${gridOptions.darkLineColor} 76%, transparent 77%, transparent)
          `,
          backgroundSize: `${gridOptions.cellSize}px ${gridOptions.cellSize}px`,
        }}
      />

      {/* Floating Orbs */}
      <div className="absolute inset-0 -top-20 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Main Content */}
      <div className="hero-container relative z-10 py-20 md:py-32">
        <div className="text-center space-y-8 md:space-y-12">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 border-blue-500/20 backdrop-blur-sm px-4 py-2 text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              AI-Powered Brand Analysis
            </Badge>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            className="space-y-4 md:space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {title && (
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                {title}
              </h1>
            )}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              {subtitle.regular}
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                {subtitle.gradient}
              </span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button 
              asChild 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 px-8 py-6 text-lg font-semibold shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
            >
              <Link to={ctaHref} className="gap-2">
                {ctaText}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white px-8 py-6 text-lg backdrop-blur-sm bg-slate-800/50"
            >
              <Link to={secondaryCtaHref} className="gap-2">
                <Play className="h-5 w-5" />
                {secondaryCtaText}
              </Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pt-12 md:pt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/20 mb-3 md:mb-4 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                  <stat.icon className="h-6 w-6 md:h-8 md:w-8 text-blue-400" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">{stat.value}</div>
                <div className="text-sm md:text-base text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Image */}
          {bottomImage && (
            <motion.div
              className="pt-12 md:pt-20"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="relative mx-auto max-w-5xl">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
                <img
                  src={bottomImage.light}
                  alt="Brand Analysis Dashboard"
                  className="w-full h-auto rounded-xl md:rounded-2xl shadow-2xl shadow-black/50 border border-slate-700"
                />
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl md:rounded-2xl blur-3xl -z-10" />
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-20" />
    </section>
  );
};