import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductImage from './ProductImage';
import axios from 'axios';

export default function CacheCart() {
  const [cart_items, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const cart = localStorage.getItem('cart');
    if (cart) {
      setCartItems(JSON.parse(cart)); // Parse the data from localStorage
      getProducts(JSON.parse(cart));
    } else {
      setCartItems([]);
    }
  }, []);

  async function getProducts(cart_items) {
    try {
      const productPromises = cart_items.map(async (item) => {
        let { data } = await axios.get(`products/${item.product_id}`);
        data.quantity = item.quantity;
        return data;
      });

      const prods = await Promise.all(productPromises);
      setProducts(prods);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  const updateQuantity = (id, quantity) => {
    if(quantity === '') {
      const updatedProducts = products.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: quantity };
        }
        return item;
      });
      setProducts(updatedProducts);
      return;
    }
    let cart = cart_items;
    const existingItem = cart.find((item) => item.product_id === id);
    existingItem.quantity = parseInt(quantity);
    if (quantity === '0') {
      cart = cart.filter((item) => item.product_id !== id);
      setCartItems([...cart]);
      console.log(cart);
      const updatedProducts = products.filter((item) => item.id !== id);
      setProducts(updatedProducts);

      const updatedCart = JSON.stringify(cart);
      localStorage.setItem('cart', updatedCart);
    } else {
      setCartItems([...cart]);
      localStorage.setItem('cart', JSON.stringify(cart));
      const updatedProducts = products.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: parseInt(quantity) };
        }
        return item;
      });
      setProducts(updatedProducts);
    }
  };

  const handleBlur = (id, event) => {
    console.log('hehehe');
    const inputValue = event.target.value;
    if (inputValue === '') {
      const existingItem = cart_items.find((item) => item.product_id === id);
      const previousQuantity = existingItem ? existingItem.quantity : '0';
      updateQuantity(id, previousQuantity);
    }
  };

  return (
    <div>
      {products.map((item) => {
        return (
          <div className='cart-item' key={item.id}>
            <Link
              key={item.id}
              to={`/products/${item.id}`}
              style={{ textDecoration: 'none', height: '100%', color: 'black' }}
            >
              <ProductImage product_id={item.id} />
            </Link>
            <h3>{item.title}</h3>
            <div className='item'>
              
              <h3>{item.unit_price}</h3>
              <input
                type='number'
                value={item.quantity}
                onChange={(event) => updateQuantity(item.id, event.target.value)}
                onBlur={(event) => handleBlur(item.id, event)}
                onKeyDown={(event) => {
                  // Allow digits (0-9) and backspace key (8)
                  if (!/^\d+$/.test(event.key) && event.keyCode !== 8) {
                    event.preventDefault();
                  }
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
