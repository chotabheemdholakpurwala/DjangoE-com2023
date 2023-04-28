import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductImage from './ProductImage';

export default function OrderDetails() {

  const {id} = useParams();
  const [order, setOrder] = useState();
  const [placed_at, setPlacedAt] = useState();

  useEffect(() => {
    getOrder();
  }, []);

  async function getOrder() {
    const {data} = await axios.get(`orders/${id}`);
    console.log(data);
    setOrder(data);
    const placedAtDate = new Date(data.placed_at);

    const year = placedAtDate.getFullYear();
    const month = String(placedAtDate.getMonth() + 1).padStart(2, '0');
    const day = String(placedAtDate.getDate()).padStart(2, '0');
    const hours = String(placedAtDate.getHours()).padStart(2, '0');
    const minutes = String(placedAtDate.getMinutes()).padStart(2, '0');
    const seconds = String(placedAtDate.getSeconds()).padStart(2, '0');

    const formattedPlacedAt = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    setPlacedAt(formattedPlacedAt);
  }

  return (
    <div>
      <div className='details'>
        <h4>Placed at : {placed_at}</h4>
        <h4>Total price : &#8377;{order?.price}</h4>
        <h4>Address : {order?.address.street}, {order?.address.city}</h4>
      </div>
      {order?.items.map((item) => {
        return (
          <Link key={item.id} to={`/products/${item.product.id}`} style={{ textDecoration: 'none', height: '100%', color: 'black' }}>
            <div key={item.id} className='cart-item'>
              <div style={{height: '100%'}}>
                <ProductImage product_id={item.product.id} />
                <span style={{marginLeft: '2px', fontSize: '18px'}}>x{item.quantity}</span>
              </div>
              
              {item.product.title}
              <div className='item'>
                <div>&#8377;{item.unit_price}</div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  )
}
