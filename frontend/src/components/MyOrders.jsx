import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../App';
import { Link } from 'react-router-dom';
import ProductImage from './ProductImage';

export default function MyOrders() {

  const { user, updateUser } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    getOrders();
    getOrderItems();
  }, []);

  const getOrders = async () => {
    const {data} = await axios.get('orders/');
    console.log(data);
    setOrders(data);
  }

  async function getOrderItems() {

  }

  return (
    <div>
      {orders.map((order) => {

        const placedAtDate = new Date(order.placed_at);

        const year = placedAtDate.getFullYear();
        const month = String(placedAtDate.getMonth() + 1).padStart(2, '0');
        const day = String(placedAtDate.getDate()).padStart(2, '0');
        const hours = String(placedAtDate.getHours()).padStart(2, '0');
        const minutes = String(placedAtDate.getMinutes()).padStart(2, '0');
        const seconds = String(placedAtDate.getSeconds()).padStart(2, '0');

        const formattedPlacedAt = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        return (
          <Link to={`${order.id}`} className='order-link' key={order.id}>
            <div key={order.id} className='orders'>
              <div className='details'>
                <h4>Placed at : {formattedPlacedAt}</h4>
                <h4>Total price : &#8377;{order.price}</h4>
                <h4>Address : {order.address.street}, {order.address.city}</h4>
              </div>
              {order.items.map((item) => {
                return (
                  <div key={item.id} className='cart-item'>
                    <div style={{height: '100%'}}>
                      <ProductImage product_id={item.product.id} image={item.product.images[0]} />
                      <span style={{marginLeft: '2px', fontSize: '18px'}}>x{item.quantity}</span>
                    </div>
                    
                    {item.product.title}
                    <div className='item'>
                      <div>&#8377;{item.unit_price}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Link>
        );
      })}
    </div>
  )
}
