import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import ProductsList from './ProductsList';

export default function Search() {

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const query = params.get('q');
  const [products, setProducts] = useState([]);
  const [previous, setPrevious] = useState(null);
  const [next, setNext] = useState(null);
  const [count, setCount] = useState(null);

  useEffect(() => {
    (async () => {
      const {data} = await axios.get(`/products?q=${query}`);
      console.log(data);
      setProducts(data.results);
      setCount(data.count);
      setPrevious(data.previous);
      setNext(data.next);
    })();
  }, [query]);

  return (
    <div>
      <ProductsList products={products} count={count} previous={previous} next={next} />
    </div>
  )
}
