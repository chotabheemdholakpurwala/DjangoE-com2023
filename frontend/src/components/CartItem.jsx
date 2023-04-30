import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProductImage from './ProductImage';
import { Link } from 'react-router-dom';

export default function CartItem({cart_id}) {

  const [items, setItems] = useState([]);
  const [prev, setPrev] = useState();
  const [cart, setCart] = useState();

  useEffect(() => {
    getItems();
  }, []);

  async function getItems() {
    if(cart_id !== null) {
      // const {data} = await axios.get(`/carts/${cart_id}/items`);
      // setItems(data);
      const response = await axios.get(`carts/${cart_id}`);
      setCart(response.data);
      console.log(response.data);
      setItems(response.data.items);
    }
  }

  const updateQuantity = async (id, quantity) => {
    const qty = parseInt(quantity);
    if(qty > 0) {
      try {
        await axios.patch(`carts/${cart_id}/items/${id}/`,
          {quantity: qty}
        );
        const updatedProducts = items.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: qty };
          }
          return item;
        });
        setItems(updatedProducts);
      } catch (e) {
        console.log(e);
      }
    }
    else if(qty === 0){
      try {
        await axios.delete(`carts/${cart_id}/items/${id}`);
        console.log('deleted');
        const updatedProducts = items.filter((item) => item.id !== id);
        setItems(updatedProducts);
      } catch (e) {
        console.log(e);
      }
    }
    else {
      const updatedProducts = items.map((item) => {
        if (item.id === id) {
          setPrev(item.quantity);
          return { ...item, quantity: quantity };
        }
        return item;
      });
      setItems(updatedProducts);
      console.log('tyyy');
    }
  };

  const handleBlur = (id, event) => {
    console.log('hehehe');
    const inputValue = event.target.value;
    if (inputValue === '') {
      updateQuantity(id, parseInt(prev));
    }
  };

  return (
    <div className='cart-item-component'>
      
      <div className='cart-item-page'>
      {items.length > 0 ? 
        <>{items.map((item) => {
          return (
              <div className='cart-item' key={item.id}>
                <Link key={item.id} to={`/products/${item.product.id}`} style={{ textDecoration: 'none', height: '100%', color: 'black' }}>
                  <ProductImage product_id={item.product.id} image={item.product.images[0]} />
                </Link>
                <h3>{item.product.title}</h3>
                <div className='item'>
                <h3>&#8377;{item.product.unit_price}</h3>
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
        })}</>:
        <h1>No Items</h1>
      }
        
        <div className='cart-order'>{items.length > 0 && <Link to={`/order/`} style={{color: 'white', textDecoration: 'none', padding: '30px'}} className='link' >Order</Link>}</div>
      </div>
      <div className='price-summary'>
        <h3>Price Summary</h3>
        <div className='charges'>
          <div className='row'>
            <div>Price({cart?.items_count} items)</div>
            <div>&#8377;{cart?.total_price}</div>
          </div>
          <div className='row'>
            <div>Delivery Charges</div>
            <div>&#8377;0</div>
          </div>
          <div className='total'>
            <div>Total Payable</div>
            <div>&#8377;XYZ</div>
          </div>
          <div className='savings'>
            <div>Your Total Savings on this order is &#8377;XYZ</div>
          </div>
        </div>
      </div>
    </div>
    
  )
}
