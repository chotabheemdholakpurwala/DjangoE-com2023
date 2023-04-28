import React, { useEffect, useState } from 'react'
import SelectOrderAddress from './SelectOrderAddress';
import axios from 'axios';

export default function ManageAddresses() {

  const [defaultAddress, setDefaultAddress] = useState();
  const [selectedAddressId, setSelectedAddressId] = useState();

  useEffect(() => {
    
  }, []);

  async function setdefault() {
    console.log(selectedAddressId);
    const {data} = await axios.get(`address/${selectedAddressId}`);
    setDefaultAddress(data);
    console.log(data);
  }

  return (
    <div className='manage-addresses'>
      <SelectOrderAddress selectedAddressId={selectedAddressId} setSelectedAddressId={setSelectedAddressId} />
      <button onClick={setdefault} className='set-default'>
        Set Default
      </button>
      { defaultAddress &&
        <div className='default-address'>
          {defaultAddress.street}, {defaultAddress.city}
        </div>
      }
    </div>
  )
}
