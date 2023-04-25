import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import ProductsList from './ProductsList';
import CollectionImage from './CollectionImage';

export default function HomeCollections() {
  const [collections, setCollections] = useState([]);
  const [products, setProducts] = useState([]);
  const [showmore, setShowMore] = useState(null);

  useEffect(() => {
    fetchCollectionsAndProducts();
  }, []);

  async function fetchCollectionsAndProducts() {
    try {
      // Fetch collections data
      const collectionsResponse = await axios.get('collections/');
      setCollections(collectionsResponse.data.results);
      // Fetch products data
      let prods = {};
      let sm = {};
      collectionsResponse.data.results.forEach((collection) => {
        prods[collection.id] = collection.products;
        sm[collection.id] = false;
      });
      setShowMore(sm);
      setProducts(prods);
    } catch (error) {
      console.error(error);
    }
  }

  function handleShowMore(collectionId) {
    let sm = {...showmore};
    if(sm[collectionId] === false)
      sm[collectionId] = true;
    else
      sm[collectionId] = false;
    setShowMore(sm);
  }

  return (
    <div className='homepage-collections'>
      {collections.map((collection) => {
        // Get the products list for the current collection
        const collectionProducts = products[collection.id] || [];
        // Limit the products list to 3
        const limitedProducts = collectionProducts.slice(0, 5);
        // Check if there are more products to show
        const hasMoreProducts = collectionProducts.length > 5;
        return (
          <div key={collection.id} className='collection-products'>
            <Link to={`collections/${collection.id}`} className='collection-link'>
              <div className='collection'>
                <CollectionImage id={collection.id} />
                <h3>{collection.title}</h3>
              </div>
            </Link>
            <ProductsList products={limitedProducts} />
            {showmore[collection.id] && <ProductsList products={collectionProducts.slice(5)} />}
            {hasMoreProducts && (
              <button onClick={() => handleShowMore(collection.id)}>more...</button>
            )}
          </div>
        );
      })}
    </div>
  );
}