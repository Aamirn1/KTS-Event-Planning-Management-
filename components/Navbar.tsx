
import React from 'react';
import { ShoppingBag, MessageSquare, User, LayoutDashboard, Menu, X } from 'lucide-react';
import { CONTACT_WHATSAPP } from '../constants';

interface NavbarProps {
  currentView: 'home' | 'catalog' | 'cart' | 'chat' | 'admin';
  setView: (view: 'home' | 'catalog' | 'cart' | 'chat' | 'admin') => void;
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, cartCount }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { id: 'home', icon: User, label: 'Home' },
    { id: 'catalog', icon: Menu, label: 'Services' },
    { id: 'cart', icon: ShoppingBag, label: 'Cart', badge: cartCount },
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
    { id: 'admin', icon: LayoutDashboard, label: 'Admin' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-lg border-t border-white/10 z-50 px-6 py-3 md:top-0 md:bottom-auto md:px-12">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="hidden md:flex items-center space-x-2 cursor-pointer" onClick={() => setView('home')}>
          <div className="w-8 h-8 gold-bg rounded-md flex items-center justify-center font-serif font-bold text-black">K</div>
          <span className="font-serif text-xl gold-text font-bold">KTS Events</span>
        </div>

        <div className="flex justify-around w-full md:w-auto md:space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id as any)}
              className={`relative flex flex-col items-center p-2 transition-colors ${
                currentView === item.id ? 'gold-text' : 'text-gray-400 hover:text-white'
              }`}
            >
              <item.icon size={22} />
              <span className="text-[10px] mt-1 md:text-sm">{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-black">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="hidden md:block">
          <a
            href={`https://wa.me/${CONTACT_WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="gold-bg text-black px-4 py-2 rounded-full font-bold text-sm hover:scale-105 transition-transform"
          >
            Contact WhatsApp
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
