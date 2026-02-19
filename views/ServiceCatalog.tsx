
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../constants';
import { Plus, Info, Search } from 'lucide-react';

interface ServiceCatalogProps {
  onAddToCart: (id: string, qty: number) => void;
}

const ServiceCatalog: React.FC<ServiceCatalogProps> = ({ onAddToCart }) => {
  const [filter, setFilter] = useState<string>('All');
  const [search, setSearch] = useState('');

  const categories = ['All', ...Array.from(new Set(SERVICES.map(s => s.category)))];

  const filteredServices = SERVICES.filter(s => 
    (filter === 'All' || s.category === filter) &&
    (s.title.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-serif gold-text">Event Services</h1>
        
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 focus:ring-1 ring-[#d4af37] outline-none"
          />
        </div>
      </div>

      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              filter === cat ? 'gold-bg text-black font-bold' : 'glass text-gray-300 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service, idx) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ y: -5 }}
            className="glass rounded-3xl overflow-hidden group"
          >
            <div className="relative h-48">
              <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              {service.is3D && (
                <span className="absolute top-4 left-4 gold-bg text-black text-[10px] font-bold px-2 py-1 rounded-full shadow-lg">3D PREVIEW</span>
              )}
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-gray-400">{service.category}</span>
                <h3 className="text-xl font-serif mt-1">{service.title}</h3>
              </div>
              <p className="text-sm text-gray-400 line-clamp-2 h-10">{service.description}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Starting from</span>
                  <span className="text-lg font-bold gold-text">Rs. {service.price.toLocaleString()}</span>
                </div>
                
                <div className="flex space-x-2">
                  <button className="p-2 glass rounded-full text-gray-300 hover:text-white">
                    <Info size={18} />
                  </button>
                  <button 
                    onClick={() => onAddToCart(service.id, 1)}
                    className="p-2 gold-bg rounded-full text-black hover:scale-110 transition-transform"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ServiceCatalog;
