import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function CollectionImage({ id }) {

  const [image, setImage] = useState();

  useEffect(() => {
    (async () => {
      try {
        const {data} = await axios.get(`collections/${id}/images`);
        setImage(data[0]);
      } catch (e) {
        console.log(e);
      }
      
    })();
  }, []);

  return (
    <img key={image} src={image?.image} alt="some-image" />
  )
}
