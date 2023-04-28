import React, { useState } from 'react'
import { useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import CollectionImage from './CollectionImage';
import axios from 'axios';
import SearchIcon from '../icons/search-icon.svg';
import CartWhite from '../icons/cart.svg'
import LogoutIcon from '../icons/logout-white.svg';

export default function Navigation() {

  const { user, updateUser } = useContext(UserContext);
  const [searchtxt, setSearchTxt] = useState('');
  const navigate = useNavigate();

  async function fetchProducts(e) {
    e.preventDefault();
    navigate(`/search?q=${searchtxt}`);
  }


  return (
    <div>
       <div className='navbar'>
        <div id='logo'>
          <Link key='logo' to='/' style={{ textDecoration: 'none', height: '100%', color: 'white' }}>
            Shopy
          </Link>
        </div>
        <form className='search-section' onSubmit={fetchProducts}>
          <input required type='text' name='q' value={searchtxt} onChange={(e) => setSearchTxt(e.target.value)} />
          <button type='submit'>
            <img src={SearchIcon} />
          </button>
        </form>
        <div className='info-section'>
          {user?
          <div><Link to='accounts/' className='username'>Hello, {user.username}</Link></div>:
          <div>
            <Link to='/login' className='login'>login</Link>
            <Link to='/signup' className='login'>signup</Link>
          </div>}
          <div>
            <Link to={'/carts'} >
              <img src={CartWhite} style={{width: '25px'}} />
            </Link>
          </div>
          {user && <div><Link to='/logout' className='logout'><img src={LogoutIcon} style={{width: '25px'}} /></Link></div>}
        </div>
      </div>
    </div>
  )
}
