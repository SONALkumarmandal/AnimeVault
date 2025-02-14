import React from 'react'
import { Outlet } from 'react-router-dom'
function LoginLayout() {
  return (
    <div className='flex items-center md:flex-row w-full min-h-screen  bg-zinc-900 sm:flex-col'>
        <div className='w-1/2 h-full flex-col'>
                <div className='h-1/6 flex-col items-baseline justify-center -translate-y-16 translate-x-16'><img  className='w-32' src="/img/logovalt.png" alt="logo" /></div>
            <div className='flex justify-center'><img className='w-2/3 rounded-xl' src="/img/logo.webp" alt="logo" /></div>
        </div>
        <div className='w-1/2 h-full flex items-center justify-center bg-zinc-900'>
                <Outlet/>
        </div>
    </div>
  )
}

export default LoginLayout