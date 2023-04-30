import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Routes, Route } from 'react-router-dom';
import Product from './Product';
import ProductsList from './ProductsList';

export default function ProductsAll() {

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
    console.log(data);
  }

  return (
    <div>
      <ProductsList 
        products={products} 
        setProducts={setProducts} 
        count={count} 
        setCount={setCount} 
        previous={previous} 
        setPrevious={setPrevious} 
        next={next} 
        setNext={setNext} 
      />
    </div>
  )
}
