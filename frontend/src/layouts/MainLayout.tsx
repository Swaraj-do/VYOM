import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/layout/Header';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Outlet />
    </div>
  );
};