import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Routes, Route } from 'react-router-dom';
import Product from './Product';
import ProductsList from './ProductsList';

export default function Products() {

  const [products, setProducts] = useState([]);
  const [previous, setPrevious] = useState(null);
  const [next, setNext] = useState(null);
  const [count, setCount] = useState(null);

  useEffect(() => {
    AllProducts();
  }, []);

  async function AllProducts() {
    const {data} = await axios.get('products/');
    setProducts(data.results);
    setCount(data.count);
    setPrevious(data.previous);
    setNext(data.next);
  }

  return (
      <Routes>
        <Route path='/' element={<ProductsList products={products} count={count} previous={previous} next={next} />} />
        <Route path='/:id' element={<Product />} />
      </Routes>
  )
}
