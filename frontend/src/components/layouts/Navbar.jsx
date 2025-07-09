import React from 'react';
import { useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from './SideMenu';


const Navbar = ({activeMenu}) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  return (
    <div className="flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
      <button 
        className="block lg:hidden text-black"
        onClick={() => {
          setOpenSideMenu(!openSideMenu);
        }}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>
       
        <div className="flex items-center gap-3">
          <img src="/Logo.png" alt="Logo" className="w-6 h-6" />
          <h1 className="text-lg font-semibold text-gray-800">
            <span className="text-black">Pesa</span>
            <span className="text-violet-600">Fit</span>
            <span className="ml-1 text-sm font-normal text-gray-500">
              Expense Tracker
            </span>
          </h1>
        </div>

      {openSideMenu && (
        <div className="fixed top-[61px] -ml-4 bg-white">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  )
}

export default Navbar