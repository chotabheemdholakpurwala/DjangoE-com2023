import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

const ImageSlider = ( { collections } ) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
  };


  useEffect(() => {
    // (async() => {
    //   const {data} = await axios.get('collections/');
    //   setCollections(data.results);
    //   collections.map((collection) => {
    //     return console.log(collection.images[0].image);
    //   })
    // })();
  }, [collections]);


  return (
    <div className="slider-container">
      <Slider {...settings}>
        {collections?.map((collection) => {
          return (
            <div className="slide" key={collection.id}>
              <img src={collection.images[0].image} alt="Slide 1" />
              <div className="caption">
              </div>
            </div>
          );
        })}
        
      </Slider>
    </div>
  );
};

export default ImageSlider;
