import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Routes, Route } from 'react-router-dom';
import Product from './Product';
import ProductsAll from './ProductsAll';

export default function Products() {

  return (
      <Routes>
        <Route path='/' element={<ProductsAll />} />
        <Route path='/:id' element={<Product />} />
      </Routes>
  )
}
