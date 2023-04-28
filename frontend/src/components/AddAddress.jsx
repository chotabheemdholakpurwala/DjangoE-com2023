import React, { useState } from 'react';
import axios from 'axios';

export default function AddAddress({ onAddressAdded, setAddressId }) {
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');

  async function addAddress(event) {
    event.preventDefault();

    const { data } = await axios.post('/address/', { street: street, city: city });
    console.log(data);
    onAddressAdded(data);
    setStreet('');
    setCity('');
    setAddressId(data.id);
  }

  return (
    <div className='add-address-component'>
      <form onSubmit={addAddress}>
        <table>
          <tbody>
            <tr className='field'>
              <td><label htmlFor='street'>Street:</label></td>
              <td><input type='text' id='street' onChange={(event) => setStreet(event.target.value)} value={street} /></td>
            </tr>
            <tr>
              <td><label htmlFor='city'>City:</label></td>
              <td><input type='text' id='city' onChange={(event) => setCity(event.target.value)} value={city} /></td>
            </tr>
          </tbody>
        </table>
        <button type='submit'>ADD ADDRESS</button>
      </form>
    </div>
  );
}
