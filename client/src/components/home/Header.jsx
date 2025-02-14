import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogOut = () => {
    localStorage.clear("token");
    navigate("/");
  };

  return (
    <div className="sticky top-0 w-full bg-zinc-900 flex flex-wrap items-center justify-between p-4 shadow-md">
      {/* Logo Section */}
      <div className="w-1/3 md:w-1/6 flex justify-start">
        <Link to={'/'}>
          <img className="w-32 h-10" src="/img/logovalt.png" alt="logo" />
        </Link>
      </div>
      
      {/* Mobile Menu Button */}
      <button 
        className="md:hidden text-white focus:outline-none" 
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? (
          <span className="text-3xl">&#x2715;</span> // Close icon (X)
        ) : (
          <span className="text-3xl">&#9776;</span> // Hamburger icon
        )}
      </button>

      {/* Navigation Links */}
      <div className={`absolute md:static top-16 left-0 w-full md:w-auto bg-zinc-900 md:bg-transparent md:flex md:items-center transition-all duration-300 ease-in-out ${menuOpen ? 'block' : 'hidden'}`}>
        <ul className="flex flex-col md:flex-row md:gap-8 w-full md:w-auto text-center md:text-left">
          <li className="py-2 md:py-0"><Link to={'/home'} className="block px-4 text-orange-700 font-extrabold hover:underline">Trending</Link></li>
          <li className="py-2 md:py-0"><Link to={'/home/toprated'} className="block px-4 text-orange-700 font-extrabold hover:underline">Highest Rated</Link></li>
          <li className="py-2 md:py-0"><Link to={'/home/popular'} className="block px-4 text-orange-700 font-extrabold hover:underline">Most Popular</Link></li>
          <li className="py-2 md:py-0">
            <button onClick={handleLogOut} className="block px-4 text-slate-300 font-extrabold hover:text-orange-500 w-full text-left md:text-center">
              Log Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
