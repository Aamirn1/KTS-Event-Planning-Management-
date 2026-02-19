
import React from 'react';
import { motion } from 'framer-motion';
import ThreeHero from '../components/ThreeHero';
import { ChevronRight, Calendar, Star, Users } from 'lucide-react';

interface CustomerHomeProps {
  onExplore: () => void;
}

const CustomerHome: React.FC<CustomerHomeProps> = ({ onExplore }) => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative">
        <ThreeHero />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-bold mb-4"
          >
            Events Reimagined in <span className="gold-text">3D</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-300 max-w-lg mb-8"
          >
            From luxury weddings to corporate galas, we bring your vision to life in Rawalpindi with premium decor and expert management.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onExplore}
            className="gold-bg text-black px-8 py-4 rounded-full font-bold flex items-center space-x-2 shadow-lg shadow-yellow-600/20"
          >
            <span>Browse Services</span>
            <ChevronRight size={20} />
          </motion.button>
        </div>
      </section>

      {/* Stats / Features */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Star, label: "5-Star Service", value: "Premium" },
          { icon: Calendar, label: "Successful Events", value: "500+" },
          { icon: Users, label: "Happy Clients", value: "1200+" },
          { icon: Star, label: "Rating", value: "4.9/5" },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass p-6 rounded-2xl text-center"
          >
            <stat.icon className="mx-auto gold-text mb-2" size={24} />
            <div className="text-xl font-bold">{stat.value}</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</div>
          </motion.div>
        ))}
      </section>

      {/* Featured Service Categories */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif gold-text">Why KTS Management?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass p-8 rounded-3xl space-y-4">
            <h3 className="text-xl font-serif">Fast Custom Quotes</h3>
            <p className="text-gray-400">Get an instant estimate for your event or request a detailed custom quote with venue sketches.</p>
          </div>
          <div className="glass p-8 rounded-3xl space-y-4">
            <h3 className="text-xl font-serif">Real-time Coordination</h3>
            <p className="text-gray-400">Chat directly with our managers and receive push notifications on every step of your event setup.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomerHome;
