
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Package, TrendingUp, Users, DollarSign, Clock, CheckCircle } from 'lucide-react';

const MOCK_DATA = [
  { name: 'Jan', orders: 45 },
  { name: 'Feb', orders: 52 },
  { name: 'Mar', orders: 38 },
  { name: 'Apr', orders: 65 },
  { name: 'May', orders: 48 },
  { name: 'Jun', orders: 72 },
];

const COLORS = ['#d4af37', '#b8860b', '#ffd700', '#daa520'];

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-serif gold-text">Management Dashboard</h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: 'Rs. 2.4M', icon: DollarSign, color: 'text-green-500' },
          { label: 'Active Orders', value: '18', icon: Package, color: 'text-blue-500' },
          { label: 'Inquiries', value: '42', icon: Clock, color: 'text-yellow-500' },
          { label: 'Completed', value: '124', icon: CheckCircle, color: 'text-purple-500' },
        ].map((stat, i) => (
          <div key={i} className="glass p-6 rounded-3xl">
            <stat.icon className={`${stat.color} mb-3`} size={24} />
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Sales Chart */}
        <div className="glass p-6 rounded-3xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-serif">Order Volume</h2>
            <TrendingUp size={20} className="gold-text" />
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_DATA}>
                <XAxis dataKey="name" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                  cursor={{ fill: 'rgba(212,175,55,0.1)' }}
                />
                <Bar dataKey="orders" radius={[4, 4, 0, 0]}>
                  {MOCK_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass p-6 rounded-3xl">
          <h2 className="text-xl font-serif mb-6">Recent Orders</h2>
          <div className="space-y-4">
            {[
              { customer: 'Ahmed Malik', event: 'Wedding Reception', status: 'Pending', price: 'Rs. 250,000' },
              { customer: 'Sara Khan', event: 'Corporate Launch', status: 'Confirmed', price: 'Rs. 120,000' },
              { customer: 'Imran Shah', event: 'Birthday Bash', status: 'Quote Sent', price: 'Rs. 45,000' },
              { customer: 'Zia Ul Haq', event: 'Engagement', status: 'In Prep', price: 'Rs. 85,000' },
            ].map((order, i) => (
              <div key={i} className="flex items-center justify-between p-3 border-b border-white/5 last:border-0">
                <div>
                  <div className="font-bold text-sm">{order.customer}</div>
                  <div className="text-xs text-gray-500">{order.event}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold gold-text">{order.price}</div>
                  <div className="text-[10px] text-gray-400">{order.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
