import React, { useState } from 'react';
import axios from 'axios';

export default function AddAddress({ onAddressAdded }) {
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');

  async function addAddress(event) {
    event.preventDefault();

    const { data } = await axios.post('/address/', { street: street, city: city });
    console.log(data);
    onAddressAdded(data);
  }

  return (
    <div>
      Address
      <button onClick={(event) => addAddress(event)}>add address</button>
      <input type='text' onChange={(event) => setStreet(event.target.value)} />
      <input type='text' onChange={(event) => setCity(event.target.value)} />
    </div>
  );
}
