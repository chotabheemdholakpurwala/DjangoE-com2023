import React, { useState } from 'react'
import { useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import axios from 'axios';
import AddToCartIcon from '../icons/add-to-cart-icon.svg';
import LogoutIcon from '../icons/logout-icon.svg';

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
          <Link key='logo' to='/' style={{ textDecoration: 'none', height: '100%', color: 'black' }}>
            Shopy
          </Link>
        </div>
        <form className='search-section' onSubmit={fetchProducts}>
          <input required type='text' name='q' value={searchtxt} onChange={(e) => setSearchTxt(e.target.value)} />
          <button type='submit'>search</button>
        </form>
        <div className='info-section'>
          {user?
          <div>Hi, {user.username} </div>:
          <div>
            <Link to='/login' className='login'>login</Link>
            <Link to='/signup' className='login'>signup</Link>
          </div>}
          <div>
            <Link to={'/carts'} >
              <img src={AddToCartIcon} style={{width: '30px'}} />
            </Link>
          </div>
          {user && <div><Link to='/logout' className='logout'><img src={LogoutIcon} style={{width: '20px'}} /></Link></div>}
        </div>
      </div>
    </div>
  )
}
