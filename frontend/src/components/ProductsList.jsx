import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, Routes, Route, useParams, useLocation } from 'react-router-dom';
import ProductImage from './ProductImage';
import { UserContext } from '../App';
import AddToCartIcon from '../icons/add-to-cart-icon.svg';

export default function ProductsList({ products, count, previous, next }) {

  const { user, updateUser } = useContext(UserContext);

  useEffect(() => {
  }, []);

  async function addToCart(id, event) {
    event.preventDefault();
    event.stopPropagation();
    try {
      if(user) {
        let cart_id = user.cart;
        if(user.cart === null) {
          const {data} = await axios.post('/carts/');
          cart_id = data.id;
          updateUser({ ...user, cart: data.id });
        }
        const quantity = 1;
        await axios.post(`http://127.0.0.1:8000/carts/${cart_id}/items/`, { product_id: id, quantity: quantity });
        alert("Product Added To Cart");
      }
      else {
        let cart = localStorage.getItem('cart');
        if(!cart) {
          cart = [{product_id: id, quantity: 1}];
        }
        else {
          cart = JSON.parse(cart); // Parse the cart data from localStorage
          const existingItem = cart.find(item => item.product_id === id);
          if (existingItem) {
            existingItem.quantity += 1; // Increase quantity by one
          } else {
            cart = cart.concat([{ product_id: id, quantity: 1 }]);
          }
        }
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    } catch (error) {
      console.error('Error making POST request:', error);
    }
  }

  return (
    <div className='products-list'>
      {products.map((product) => {
        return (
          <Link key={product.id} to={`/products/${product.id}`} style={{ textDecoration: 'none', height: '100%', color: 'black' }}>
            <div className='products'>
              <div className='image-container'>
                <button onClick={(event) => addToCart(product.id, event)}>
                  <img className='add-to-cart-icon' src={AddToCartIcon} />
                </button>
                <ProductImage product_id={product.id} />
              </div>
              <div className='product-info'>
                <p>{product.title}</p>
                <p>&#8377;{product.unit_price}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  )
}
