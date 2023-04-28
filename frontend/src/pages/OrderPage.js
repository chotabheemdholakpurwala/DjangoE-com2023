import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MyOrders from '../components/MyOrders'
import OrderDetails from '../components/OrderDetails'

export default function OrderPage() {
  return (
    <div className='orders-component'>
      <h1 style={{flex: '1', backgroundColor: 'white', padding: '10px', border: '1px solid rgb(221, 221, 221', borderRadius: '5px', margin: '0px', marginBottom: '10px'}}>Orders Page</h1>
      <Routes>
        <Route path='/' element={<MyOrders />} />
        <Route path='/:id' element={<OrderDetails />} />
      </Routes>
    </div>
  )
}
