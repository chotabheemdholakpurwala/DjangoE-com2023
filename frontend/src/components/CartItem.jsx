import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProductImage from './ProductImage';
import { Link } from 'react-router-dom';

export default function CartItem({cart_id}) {

  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems();
  }, []);

  async function getItems() {
    if(cart_id !== null) {
      const {data} = await axios.get(`/carts/${cart_id}/items`);
      setItems(data);
    }
    else {
      const {data} = await axios.post('/carts');
      
    }
  }

  return (
    <div>
      {items.map((item) => {
        return (
            <div className='cart-item' key={item.id}>
              <Link key={item.id} to={`/products/${item.product.id}`} style={{ textDecoration: 'none', height: '100%', color: 'black' }}>
                <ProductImage product_id={item.product.id} />
              </Link>
              <h3>{item.product.title}</h3>
            </div>
        );
      })}
      
      {items.length > 0 && <Link to={`/orders/`}>Order</Link>}
    </div>
  )
}
