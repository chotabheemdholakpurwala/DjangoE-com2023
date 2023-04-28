import React from 'react'
import MyOrders from '../components/MyOrders'
import OrderPage from './OrderPage'
import Wishlist from '../components/Wishlist'
import { Route, Routes } from 'react-router-dom'
import Account from '../components/Account'
import { Link } from 'react-router-dom'
import UserIcon from '../icons/user-icon.svg';
import OrdersIcon from '../icons/orders2-icon.svg';
import WishListIcon from '../icons/bookmarks.svg';
import Settings from '../icons/settings.svg';
import ManageAddresses from '../components/ManageAddresses'

export default function AccountPage() {
  return (
    <div className='account-page'>
      <div className='sidebar'>
        <div className='user-info'>
          <div className='imgs-links'>
            <img src={UserIcon} />
            <Link to='/accounts' className='links'>
                MY PROFILE
            </Link>
          </div>
          
          <div className='imgs-links'>
            <img src={OrdersIcon} />
            <Link to='orders/' className='links'>
                MY ORDERS
            </Link>
          </div>
          <div className='heading'>
            <div className='header'>
              <img src={Settings} />
              ACCOUNT SETTINGS
            </div>
            <div className='sublinks'>
              <Link to='/accounts' className='links'>
                  Profile Information
              </Link>
              <Link to='manage-addresses/' className='links'>
                  Manage Addresses
              </Link>
            </div>
          </div>
          <div className='imgs-links'>
            <img src={WishListIcon} />
            <Link to='wishlist/' className='links'>
              WISHLIST
            </Link>
          </div>
        </div>
        <div>

        </div>
      </div>
      <Routes>
        <Route path='/' element={<Account />} />
        <Route path='/orders/*' element={<OrderPage />} />
        <Route path='/wishlist/*' element={<Wishlist />} />
        <Route path='/manage-addresses/*' element={<ManageAddresses />} />
      </Routes>
    </div>
  )
}
