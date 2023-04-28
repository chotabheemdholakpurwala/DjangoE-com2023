import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function ProductImages({id}) {

  const [images, setImages] = useState([]);

  useEffect(() => {
    getImages();
  }, [id]);

  const getImages = async () => {
    const {data} = await axios.get(`products/${id}/images`);
    setImages(data);
    console.log(data);
  }

  return (
    <div className='all-images'>
      {images.map((image) => {
        return (
        <div><img key={image} src={'http://127.0.0.1:8000'+image?.image} alt="some-image" /></div>);
      })}
    </div>
  )
}
