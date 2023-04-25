import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import CartItem from './CartItem';
import { UserContext } from '../App';
import CacheCart from './CacheCart';

export default function Cart() {

  const { user, updateUser } = useContext(UserContext);

  useEffect(() => {
    
  }, []);

  return (
    <div>
      {user? <CartItem cart_id={user.cart} /> : <CacheCart /> }
    </div>
  )
}
