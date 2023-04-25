import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function ProductDetails({product_id}) {

  const [product, setProduct] = useState();

  useEffect(() => {
    (async () => {
      const {data} = await axios.get(`products/${product_id}`);
      setProduct(data);
    })();

  }, []);

  return (
      <h1>{product?.title}</h1>
  )
}
