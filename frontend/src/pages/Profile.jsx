import { current } from '@reduxjs/toolkit';
import React from 'react'
import { useSelector } from 'react-redux';

export default function Profile() {
  return (
    <div>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Profile</h1>
        <form className='flex flex-col gap-4'>
          <img src={current.avatar} alt='profile'
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center" />
          <input type='text' placeholder='username' id='username'
          className='border p-3 rounded-lg '/>
          <input type='email' placeholder='email' id='email'
          className='border p-3 rounded-lg '/>
           <input type='password' placeholder='password' id='password'
          className='border p-3 rounded-lg '/>
          <button className='bg-slate-800 text-white rounded-lg uppercase p-3 hover:opacity-95 disabled:opacity-80'>
            update
          </button>
        </form>
        <div className='flex  justify-between mt-5'>
          <span className='text-red-700 cursor-pointer'>Delete account </span>
 <span className='text-red-700 cursor-pointer'>sign out  </span>
        </div>
    </div>
  );
}
