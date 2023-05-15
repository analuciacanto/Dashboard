import React, { useState, useEffect } from 'react';
import settings from '../../settings';
import coppeImg from '../../assets/coppe.png';
import './styles.css';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
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
      <div className='searchBar'>
      <FormControl variant="standard">
          <InputLabel  size="small" htmlFor="input-with-icon-adornment">
            </InputLabel>
        <Input
          id="input-with-icon-adornment"
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </FormControl>
      </div>
      <div className="clock-container">
        <h2>{clock}</h2>
      </div>
    </header>
  );
};

export default Header;
