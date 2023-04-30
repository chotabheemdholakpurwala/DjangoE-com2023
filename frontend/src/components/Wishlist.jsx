import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { UserContext } from '../App';
import axios from 'axios';
import ProductImage from './ProductImage';
import { Link } from 'react-router-dom';

export default function Wishlist() {

  const [wishlist, setWishlist] = useState();

  useEffect(() => {
    getWishlist();
  }, []);

  async function getWishlist() {
    const {data} = await axios.get('wishlists/');
    console.log(data);
    setWishlist(data[0]);
  }

  async function deleteItem(event, id) {
    event.preventDefault();
    event.stopPropagation();

    await axios.delete(`wishlists/${wishlist.id}/items/${id}/`);
    const {data} = await axios.get('wishlists/');
    setWishlist(data[0]);
  }

  return (
    <div className='wishlist-component'>
      <h1 style={{flex: '1', backgroundColor: 'white', padding: '10px', border: '1px solid rgb(221, 221, 221', borderRadius: '5px', margin: '0px', marginBottom: '10px'}}>
        {wishlist && wishlist.items.length > 0 ? wishlist.title : "Empty Wishlist!!!"}
      </h1>
      <div className='wishlist'>
        {wishlist?.items.map((item) => {
          return (
            <Link key={item.id} to={`/products/${item.product.id}`} style={{ textDecoration: 'none', height: '100%', color: 'black' }}>
              <div key={item.id} className='cart-item'>
                <div style={{height: '100%'}}>
                  <ProductImage product_id={item.product.id} image={product.images[0]} />
                </div>
                
                {item.product.title}
                <div className='item'>
                  <div>&#8377;{item.product.unit_price}</div>
                  <button onClick={(event) => deleteItem(event, item.id)}>
                    delete
                  </button>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  )
}
