import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';

function HomeLayout() {
  const navigate = useNavigate();

  // Check token validity on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="flex-col">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default HomeLayout;
