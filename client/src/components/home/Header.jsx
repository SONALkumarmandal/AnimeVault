import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.clear("token");
    navigate("/");
  };

  return (
    <div className="sticky top-0 w-full bg-zinc-900 flex flex-wrap items-center justify-between p-4 shadow-md">
      {/* Logo Section */}
      <div className="w-1/3 md:w-1/6 flex justify-start">
        <Link to={'/'}>
          <img className="w-32 h-10" src="/src/assets/img/logovalt.png" alt="logo" />
        </Link>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-wrap gap-4 md:gap-8 justify-end w-full md:w-auto mt-4 md:mt-0">
        <Link to={'/home'} className="text-orange-700 font-extrabold hover:underline">Trending</Link>
        <Link to={'/home/toprated'} className="text-orange-700 font-extrabold hover:underline">Highest Rated</Link>
        <Link to={'/home/popular'} className="text-orange-700 font-extrabold hover:underline">Most Popular</Link>
        <button
          onClick={handleLogOut}
          className="text-slate-300 font-extrabold hover:text-orange-500"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Header;
