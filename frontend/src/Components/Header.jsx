import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo1.jpeg';

export function Header({changeState, changeState1}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("email");
    navigate("/login"); 
  };

  return (
    <header className="bg-[#0a0e14] h-[60px] px-6 text-white flex items-center justify-between">
    {/* <header className="bg-[#0a0e14] h-[60px] px-6 text-white flex items-center justify-between"> */}
      <div className='flex items-center'>
        <img src={logo} alt="Logo" className="h-15 w-12 mr-2"/>
        <p className="text-[1.5rem] font-extrabold text-[#00BFFF]">MockMate</p>
      </div>
      <nav className="flex items-center space-x-4">
        <a href="#" className="hover:none" onClick={changeState} >Interview</a>
        <a href="#" className="hover:none" onClick={changeState1} >Profile</a>
        <button 
          onClick={handleLogout} 
          className="bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded"
        >
          Logout
        </button>
      </nav>
    </header>
  );
}
