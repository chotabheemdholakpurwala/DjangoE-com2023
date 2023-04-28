import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CollectionsList = () => {
  const [collections, setCollections] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const pagesize = 10;
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCollections = async () => {
      console.log('page=', currentPage);
      try {
        const response = await axios.get(`collections/`, { 
          params: {
            page: currentPage, 
          },
        });
        setCount(response.data.count);
        setCollections(response.data.results);
      } catch (error) {
        console.error('Error fetching collections:', error);
      }
    };
    fetchCollections();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {collections.map(collection => (
        <div key={collection.id}>{collection.title}</div>
      ))}
      
      <div className='paginator'>
        <div>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {Math.ceil(count / pagesize)}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(count / pagesize)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollectionsList;
