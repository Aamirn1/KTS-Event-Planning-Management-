
import { Service } from './types';

export const SERVICES: Service[] = [
  {
    id: 'p1',
    title: 'Wedding Planning',
    category: 'Planning',
    description: 'End-to-end luxury wedding coordination including venue selection and guest management.',
    price: 50000,
    priceUnit: 'package',
    image: 'https://picsum.photos/seed/wedding/800/600',
    is3D: true
  },
  {
    id: 'd1',
    title: 'Floral Decor',
    category: 'Decor',
    description: 'Premium fresh flower arrangements for stages, aisles, and table centerpieces.',
    price: 25000,
    priceUnit: 'package',
    image: 'https://picsum.photos/seed/decor/800/600',
    is3D: true
  },
  {
    id: 'r1',
    title: 'Chiavari Chairs',
    category: 'Rentals',
    description: 'Gold-finished elegant seating for your premium guests.',
    price: 150,
    priceUnit: 'item',
    image: 'https://picsum.photos/seed/chairs/800/600'
  },
  {
    id: 't1',
    title: 'Banquet Marquee',
    category: 'Tents',
    description: 'Spacious, weather-resistant luxury tents for outdoor celebrations.',
    price: 75000,
    priceUnit: 'package',
    image: 'https://picsum.photos/seed/tent/800/600'
  },
  {
    id: 'c1',
    title: 'Desi Feast Menu',
    category: 'Catering',
    description: 'Authentic 3-course Pakistani menu including Biryani, Karahi, and Gulab Jamun.',
    price: 1200,
    priceUnit: 'head',
    image: 'https://picsum.photos/seed/food/800/600'
  }
];

export const APP_THEME = {
  colors: {
    background: '#1a1a1a',
    primary: '#d4af37', // Gold
    secondary: '#ffffff',
    glass: 'rgba(255, 255, 255, 0.05)'
  }
};

export const CONTACT_WHATSAPP = "03205719979";
