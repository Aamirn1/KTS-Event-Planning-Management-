
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CustomerHome from './views/CustomerHome';
import ServiceCatalog from './views/ServiceCatalog';
import CartView from './views/CartView';
import ChatInterface from './components/ChatInterface';
import AdminDashboard from './views/AdminDashboard';
import { Service, OrderItem, ChatMessage } from './types';
import { SERVICES } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'catalog' | 'cart' | 'chat' | 'admin'>('home');
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const addToCart = (serviceId: string, quantity: number = 1) => {
    const service = SERVICES.find(s => s.id === serviceId);
    if (!service) return;

    setCart(prev => {
      const existing = prev.find(item => item.serviceId === serviceId);
      if (existing) {
        return prev.map(item => 
          item.serviceId === serviceId 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, {
        id: Math.random().toString(36).substr(2, 9),
        serviceId,
        quantity,
        priceAtBooking: service.price
      }];
    });
    // Visual feedback would be nice here
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const clearCart = () => setCart([]);

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white pb-24 md:pb-0 md:pt-20">
      <Navbar currentView={view} setView={setView} cartCount={cart.length} />
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        {view === 'home' && <CustomerHome onExplore={() => setView('catalog')} />}
        
        {view === 'catalog' && (
          <ServiceCatalog onAddToCart={addToCart} />
        )}
        
        {view === 'cart' && (
          <CartView 
            items={cart} 
            onRemove={removeFromCart} 
            onCheckout={() => {
              alert("Quote Request Sent! A manager will contact you soon.");
              clearCart();
              setView('chat');
            }} 
          />
        )}
        
        {view === 'chat' && (
          <div className="max-w-2xl mx-auto h-[calc(100vh-180px)]">
            <h2 className="text-2xl font-serif gold-text mb-4">Event Concierge</h2>
            <ChatInterface 
              messages={chatMessages} 
              onSend={(text) => {
                const userMsg: ChatMessage = {
                  id: Date.now().toString(),
                  senderId: 'user',
                  senderName: 'You',
                  text,
                  timestamp: new Date().toLocaleTimeString(),
                  isKTSStaff: false
                };
                setChatMessages(prev => [...prev, userMsg]);
              }}
              setMessages={setChatMessages}
            />
          </div>
        )}

        {view === 'admin' && <AdminDashboard />}
      </main>
    </div>
  );
};

export default App;
