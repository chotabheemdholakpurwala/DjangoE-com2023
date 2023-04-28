import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../App';
import AddAddress from './AddAddress';

export default function SelectOrderAddress({ selectedAddressId, setSelectedAddressId }) {

  const { user, updateUser } = useContext(UserContext);
  const [addresses, setAddresses] = useState([]);
  const [add, setAdd] = useState(false);

  useEffect(() => {
    getAddresses();
  }, []);

  async function getAddresses() {
    const { data } = await axios.get('/address');
    setAddresses(data);

    if (data.length > 0 && !selectedAddressId) {
      setSelectedAddressId(data[0].id);
      console.log(data[0].id);
    }
    else {
      setAdd(true);
    }
  }

  function handleAddressSelect(event) {
    const selectedId = event.target.value;
    setSelectedAddressId(parseInt(selectedId));
    setAdd(false);
  }

  async function handleAddressAdded(newAddress) {
    setAddresses([...addresses, newAddress]);
    setAdd(false);
  }

  function handleAddAddress(event) {
    setAdd(true);
    setSelectedAddressId(null);
  }

  return (
    <div className='select-address'>
      <h3>SELECT ADDRESS</h3>
        {addresses.map((address) => (
          <div key={address.id} className='select'>
            <input
              className='radio-btn'
              type="radio"
              id={`address-${address.id}`}
              name="address"
              value={address.id}
              checked={selectedAddressId === address.id}
              onChange={handleAddressSelect}
            />
            <label htmlFor={`address-${address.id}`}>
              {address.street}, {address.city}
            </label>
          </div>
        ))}
        <div className='add'>
          <input className='radio-btn' type='radio' name='address' id='add' checked={add} onChange={handleAddAddress}/>
          <label htmlFor='add'>ADD A NEW ADDRESS</label>
          {add && 
          <div className='add-address'>
            <AddAddress onAddressAdded={handleAddressAdded} setAddressId={setSelectedAddressId}/>
          </div>
          }
        </div>
    </div>
  )
}
