
import React from 'react';
import { OrderItem } from '../types';
import { SERVICES } from '../constants';
import { Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CartViewProps {
  items: OrderItem[];
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

const CartView: React.FC<CartViewProps> = ({ items, onRemove, onCheckout }) => {
  const cartDetails = items.map(item => ({
    ...item,
    service: SERVICES.find(s => s.id === item.serviceId)!
  }));

  const total = cartDetails.reduce((sum, item) => sum + (item.priceAtBooking * item.quantity), 0);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
        <div className="w-24 h-24 glass rounded-full flex items-center justify-center">
          <ShoppingCart size={40} className="text-gray-500" />
        </div>
        <h2 className="text-2xl font-serif">Your cart is empty</h2>
        <p className="text-gray-400 max-w-xs">Start building your event by browsing our catalog of premium services.</p>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <h1 className="text-3xl font-serif gold-text mb-6">Order Builder</h1>
        <div className="space-y-4">
          <AnimatePresence>
            {cartDetails.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="glass p-4 rounded-2xl flex items-center space-x-4"
              >
                <img src={item.service.image} className="w-20 h-20 object-cover rounded-xl" alt={item.service.title} />
                <div className="flex-1">
                  <h3 className="font-serif text-lg">{item.service.title}</h3>
                  <p className="text-xs text-gray-400">{item.service.category} • Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <div className="font-bold">Rs. {(item.priceAtBooking * item.quantity).toLocaleString()}</div>
                  <button onClick={() => onRemove(item.id)} className="text-red-500 hover:text-red-400 mt-1">
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="glass p-6 rounded-3xl sticky top-24 space-y-6">
          <h2 className="text-xl font-serif gold-text border-b border-white/10 pb-4">Quote Summary</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Subtotal</span>
              <span>Rs. {total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Estimated Tax (5%)</span>
              <span>Rs. {(total * 0.05).toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-3 border-t border-white/10">
              <span>Total Estimate</span>
              <span className="gold-text">Rs. {(total * 1.05).toLocaleString()}</span>
            </div>
          </div>

          <div className="space-y-3">
            <button 
              onClick={onCheckout}
              className="w-full gold-bg text-black py-4 rounded-full font-bold flex items-center justify-center space-x-2"
            >
              <span>Request Quote</span>
              <ArrowRight size={18} />
            </button>
            <p className="text-[10px] text-center text-gray-500 italic">
              * This is an estimate. Final pricing may vary based on venue site visit and customizations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartView;
