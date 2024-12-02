import React from 'react';
import catLogo from '../assets/cat-logo.png';
import { Link, NavLink } from 'react-router-dom';
import accountLogo from '../assets/account.png';

function NavBar() {
  return (
    <nav>
      <div className='navbar'>
        <div className='links'>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/favorites'>Favorites</NavLink>
          <NavLink to='/addPet'>Add Pet</NavLink>
        </div>
        <Link to='/'>
          <img id='cat-logo' src={catLogo} alt='a cat logo' />
        </Link>
        <div className='empty-div'>
          <NavLink to='/yourPets'>Your Pets</NavLink>
          <NavLink to='/account'><img id="account" src={accountLogo} alt="account logo" /></NavLink>

        </div>
      </div>
    </nav>
  );
}

export default NavBar;