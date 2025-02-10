import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
function Header() {
  const navigate=useNavigate()
  const handleLogOut=()=>{
    localStorage.clear("token")
    navigate("/");
  }
  return (
    <div className='sticky top-0 w-full h-3/6 bg-zinc-900 flex justify-around'>
       {/*logo*/}

        <div className='w-1/6 h-28 flex justify-center'>
            <Link to={'/'}><img className='w-32 h-10 mt-8' src="/src/assets/img/logovalt.png" alt="logo" /></Link>
         </div>

        {/*navigation buttons*/}

        <div className='w-5/6 flex justify-end gap-16 items-center mr-16'>
            {/*buttons*/} 
           {/*trending*/}      <div><button className='w-auto h-9 rounded-md text-base text-orange-700 font-extrabold flex'> <Link to={'/home'}>Trending</Link></button></div>
           {/*highest rated*/} <div><button  className='w-auto h-9 rounded-md text-base text-orange-700 font-extrabold flex'><Link to={'/home/toprated'}>Highest Rated</Link></button></div>
           <div><button className='w-auto h-9 rounded-md text-base text-orange-700 font-extrabold flex'><Link to={'/home/popular'}>Most Popular</Link></button></div>
           <div><button onClick={handleLogOut} className='w-32 h-9 rounded-md text-base text-slate-300 font-extrabold flex text-center'><Link>Log Out</Link></button></div>
        </div>
    </div>
  )
}

export default Header