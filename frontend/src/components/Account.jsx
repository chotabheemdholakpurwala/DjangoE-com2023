import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { UserContext } from '../App';
import axios from 'axios';

export default function Account() {

  const { user, updateUser } = useContext(UserContext);
  const [customer, setCustomer] = useState({});

  useEffect(() => {
    getCustomer();
  }, []);

  async function getCustomer() {
    const {data} = await axios.get(`customers/`);
    setCustomer(data[0]);
  }
  const placedAtDate = new Date(user?.date_joined);

  const year = placedAtDate.getFullYear();
  const month = String(placedAtDate.getMonth() + 1).padStart(2, '0');
  const day = String(placedAtDate.getDate()).padStart(2, '0');
  const hours = String(placedAtDate.getHours()).padStart(2, '0');
  const minutes = String(placedAtDate.getMinutes()).padStart(2, '0');
  const seconds = String(placedAtDate.getSeconds()).padStart(2, '0');

  const formattedPlacedAt = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return (
    <div className='account'>
      
      <div>
        <h3>Hello, {user?.username}</h3>
        <h3>Date joined : {formattedPlacedAt}</h3>
        <h3>Email : {user?.email}</h3>
        <h3>Membership : {customer?.membership}</h3>
      </div>
    </div>
  )
}
