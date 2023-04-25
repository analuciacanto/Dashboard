import React, { useState, useEffect } from 'react';
import settings from '../../settings';
import coppeImg from '../../assets/coppe.png';
import './styles.css';

const Header = () => {
  const [clock, setClock] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setClock(new Date().toLocaleTimeString('pt-BR'));
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  });

  return (
    <header className="header-container">
      <div className="content">
        <h1>{settings.DASHBOARD_NAME}</h1>
      </div>
      <div className="left-items-container">
        <img src={coppeImg} alt="coppe" />      
      </div>
      <div className="clock-container">
        <h2>{clock}</h2>
      </div>
    </header>
  );
};

export default Header;
