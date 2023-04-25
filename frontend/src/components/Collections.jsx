import React from 'react'
import Collection from './Collection'
import CollectionsList from './CollectionsList'
import { Route, Routes } from 'react-router-dom'

export default function Collections() {


  return (
    <Routes>
      <Route path='/' element={<CollectionsList />} />
      <Route path='/:id' element={<Collection />} />
    </Routes>
  )
}
