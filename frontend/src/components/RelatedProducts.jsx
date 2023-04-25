import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProductsList from './ProductsList';

export default function RelatedProducts({collection_id}) {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async() => {
    const {data} = await axios.get(`collections/${collection_id}`);
    console.log(data);
    let slicing = (data.products_count > 6 ? 6:data.products_count);
    setProducts(data.products.slice(0, slicing));
  }

  return (
    <div>
      <ProductsList products={products} count={-1}/>
    </div>
  )
}
