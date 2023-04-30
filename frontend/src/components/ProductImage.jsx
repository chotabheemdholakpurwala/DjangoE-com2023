import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function ProductImage({product_id, image}) {

  // const [image, setImage] = useState();

  useEffect(() => {
    // (async () => {
    //   const {data} = await axios.get(`products/${product_id}/images`);
    //   setImage(data[0]);
    // })();
    console.log(image);
  }, [product_id, image]);

  return (
      <img className='main-image' key={image} src={image?.image} alt="some-image" />
  )
}
