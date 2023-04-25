import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../App';
import AddAddress from './AddAddress';

export default function Order() {
  const { user, updateUser } = useContext(UserContext);
  const [addresses, setAddresses] = useState([]);
  
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  useEffect(() => {
    getAddresses();
  }, []);

  async function getAddresses() {
    const { data } = await axios.get('/address');
    setAddresses(data);

    if (data.length > 0 && !selectedAddressId) {
      setSelectedAddressId(data[0].id);
    }
  }

  function handleAddressSelect(event) {
    const selectedId = event.target.value;
    setSelectedAddressId(selectedId);
  }

  async function handleAddressAdded(newAddress) {
    setAddresses([...addresses, newAddress]);
  }

  async function order() {
    try {
      const cart_id = user.cart;
      await axios.post('orders/', { cart_id: cart_id, address_id: selectedAddressId });
      console.log('Order Successfull!!!');
    } catch (e) {
      console.log('Error Ordering!!!', user.cart);
    }
  }

  return (
    <div>
      Order
      <div>
        Address
        <AddAddress onAddressAdded={handleAddressAdded} />
        <select value={selectedAddressId} onChange={handleAddressSelect}>
          {addresses.map((address) => (
            <option key={address.id} value={address.id}>
              {address.street}, {address.city}
            </option>
          ))}
        </select>
      </div>
      <button onClick={order}>Order</button>
    </div>
  );
}
