import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Products from '../components/Products';
import Navigation from '../components/Navigation';
import Search from '../components/Search';
import CartPage from './CartPage';
import OrderPage from './OrderPage';
import HomeCollections from '../components/HomeCollections';
import Collections from '../components/Collections';
import Footer from '../components/Footer';
import AccountPage from './AccountPage';
import Order from '../components/Order';



export default function Homepage() {

  

  return (
    <div className='HomePage'>
      <Navigation />
      
      <Routes key='1'>
        <Route path='/*' element={<HomeCollections />} />
        <Route path='/collections/*' element={<Collections />} />
        <Route path='/products/*' element={<Products />} />
        <Route path='/search/*' element={<Search />} />
        <Route path='/carts/*' element={<CartPage />} />
        <Route path='/accounts/*' element={<AccountPage />} />
        <Route path='/order/*' element={<Order />} />
      </Routes>
      <Footer />
    </div>
  )
}
