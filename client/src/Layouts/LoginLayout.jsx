import React from 'react';
import { Outlet } from 'react-router-dom';

function LoginLayout() {
  return (
    <div className='flex flex-col md:flex-row items-center w-full min-h-screen bg-zinc-900'>
      {/* Left Side (Logo & Image) */}
      <div className='w-full md:w-1/2 flex flex-col p-6'>
        <img className='w-24' src='/img/logovalt.png' alt='logo' />
        <div className='w-full flex justify-center p-8'>
          <img className='w-4/5 rounded-xl' src='/img/logo.webp' alt='logo' />
        </div>
      </div>
      {/* Right Side (Form Section) */}
      <div className='w-full md:w-1/2 flex items-center justify-center p-6 bg-zinc-900'>
        <Outlet />
      </div>
    </div>
  );
}

export default LoginLayout;
