import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function ProductImages({id, images}) {

  // const [images, setImages] = useState([]);

  useEffect(() => {
    getImages();
    console.log(images);
  }, [id, images]);

  const getImages = async () => {
    // const {data} = await axios.get(`products/${id}/images`);
    // setImages(data);
    // console.log(data);
  }

  return (
    <div className='all-images'>
      {images && images.map((image) => {
        return (
        <div><img key={image} src={image?.image} alt="some-image" /></div>);
      })}
    </div>
  )
}
