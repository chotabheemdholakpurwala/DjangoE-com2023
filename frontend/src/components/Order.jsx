import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../App';
import AddAddress from './AddAddress';
import SelectOrderAddress from './SelectOrderAddress';

export default function Order() {

  const { user, updateUser } = useContext(UserContext);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    (async() => {
      const {data} = await axios.get(`carts/${user.cart}`);
      console.log(data);
      setCart(data);
    })();
  }, [user]);

  function handleAddressSelect(event) {
    const selectedId = event.target.value;
    setSelectedAddressId(selectedId);
  }


  async function order() {
    console.log(selectedAddressId);
    try {
      const cart_id = user.cart;
      await axios.post('orders/', { cart_id: cart_id, address_id: selectedAddressId });
      console.log('Order Successfull!!!');
      window.location.href = '/';
    } catch (e) {
      console.log('Error Ordering!!!', user.cart);
    }
  }

  return (
    <div className='order-page'>
      <div className='ordering-page'>
        <SelectOrderAddress selectedAddressId={selectedAddressId} setSelectedAddressId={setSelectedAddressId} />
        <div className='order-btn-div'>
        <button className='order-btn' onClick={order}>ORDER</button>
        </div>
        
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
    
  );
}
