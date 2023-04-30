import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function ProductImage({product_id, image}) {

  // const [image, setImage] = useState();

  // useEffect(() => {
  //   (async () => {
  //     const {data} = await axios.get(`products/${product_id}/images`);
  //     setImage(data[0]);
  //   })();
  // }, [product_id]);

  return (
      <img className='main-image' key={image} src={'https://shopibackend-vanshchaudhary6993.b4a.run'+image?.image} alt="some-image" />
  )
}
