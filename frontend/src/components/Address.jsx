import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddAddress from './AddAddress';

export default function Address() {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null); // state to store selected address ID

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

  // Handler for when an address is selected
  function handleAddressSelect(event) {
    const selectedId = event.target.value;
    setSelectedAddressId(selectedId);
  }

  function printaddress() {
    console.log(selectedAddressId);
  }

  return (
    <div>
      Address
      <AddAddress />
      <select value={selectedAddressId} onChange={handleAddressSelect}>
        {addresses.map((address) => (
          <option key={address.id} value={address.id}>
            {address.street}, {address.city}
          </option>
        ))}
      </select>
    </div>
  );
}
