import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductsList from './ProductsList';

export default function Collection() {
  const { id } = useParams();
  const [products, setProducts] = useState([]); 
  const [pagesize, setPagesize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [collection, setCollection] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`collections/${id}`);
        const { data } = response;
        setProducts(data.products);
        setCollection(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const productsToDisplay = products.slice(
    (currentPage - 1) * pagesize,
    currentPage * pagesize
  );

  return (
    <div>
      <h1>{collection?.title}</h1>
      <ProductsList products={productsToDisplay} />
      <div className='paginator'>
        <div>
        <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {Math.ceil(products.length / pagesize)}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(products.length / pagesize)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
