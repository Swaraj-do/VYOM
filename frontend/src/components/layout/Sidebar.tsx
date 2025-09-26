import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Upload, 
  Shield, 
  FileText, 
  Settings,
  Home
} from 'lucide-react';

interface SidebarItem {
  to: string;
  icon: React.ElementType;
  label: string;
}

const sidebarItems: SidebarItem[] = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/dashboard/bulk-upload', icon: Upload, label: 'Bulk Upload' },
  { to: '/dashboard/blacklist', icon: Shield, label: 'Blacklist' },
  { to: '/dashboard/logs', icon: FileText, label: 'Logs' },
  { to: '/dashboard/settings', icon: Settings, label: 'Settings' }
];

export const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen">
      <div className="p-6">
        <Link to="/" className="flex items-center space-x-3 mb-8">
          <Home className="w-6 h-6" />
          <span className="text-lg font-semibold">Back to Home</span>
        </Link>
        
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        
        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.to;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};