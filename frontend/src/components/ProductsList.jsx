import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, Routes, Route, useParams, useLocation } from 'react-router-dom';
import ProductImage from './ProductImage';
import { UserContext } from '../App';
import AddToCartIcon from '../icons/add-to-cart-icon.svg';
import AddToWishlist from '../icons/heart-decoration.svg';

export default function ProductsList({ products, setProducts, count, setCount, previous, setPrevious, next, setNext }) {

  const { user, updateUser } = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState(1);
  const pagesize = 10;

  useEffect(() => {
  }, []);

  async function addToCart(id, event) {
    event.preventDefault();
    event.stopPropagation();
    try {
      if(user) {
        let cart_id = user.cart;
        if(user.cart === null) {
          const {data} = await axios.post('carts/');
          cart_id = data.id;
          updateUser({ ...user, cart: data.id });
        }
        const quantity = 1;
        await axios.post(`http://127.0.0.1:8000/carts/${cart_id}/items/`, { product_id: id, quantity: quantity });
        alert("Product Added To Cart");
      }
      else {
        let cart = localStorage.getItem('cart');
        if(!cart) {
          cart = [{product_id: id, quantity: 1}];
        }
        else {
          cart = JSON.parse(cart); // Parse the cart data from localStorage
          const existingItem = cart.find(item => item.product_id === id);
          if (existingItem) {
            existingItem.quantity += 1; // Increase quantity by one
          } else {
            cart = cart.concat([{ product_id: id, quantity: 1 }]);
          }
        }
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    } catch (error) {
      console.error('Error making POST request:', error);
    }
  }

  async function addToWishlist(id, event) {
    event.preventDefault();
    event.stopPropagation();
    const {data} = await axios.post('/wishlists/');
    updateUser({ ...user, wish_list: data.id });
    await axios.post(`wishlists/${data.id}/items/`, {product_id: id});

  }

  async function handlePageChange(pageNumber) {
    const {data} = await axios.get(`products/?page=${pageNumber}`);
    setProducts(data.results);
    setCount(data.count);
    setCurrentPage(pageNumber);
    setPrevious(data.previous);
    setNext(data.next);
    console.log(data);
  }

  return (
    <div>
      <div className='products-list'>
        {products.map((product) => {
          const title = product.title.length > 20 ? (product.title.slice(0, 20)+'...'):product.title;
          return (
            <Link key={product.id} to={`/products/${product.id}`} style={{ textDecoration: 'none', height: '100%', color: 'black' }}>
              <div className='products'>
                <div className='image-container'>
                  <button id='add-to-wishlist' onClick={(event) => addToWishlist(product.id, event)}>
                    <img className='add-to-cart-icon' src={AddToWishlist} />
                  </button>
                  <button id='add-to-cart' onClick={(event) => addToCart(product.id, event)}>
                    <img className='add-to-cart-icon' src={AddToCartIcon} />
                  </button>
                  <ProductImage product_id={product.id} />
                </div>
                <div className='product-info'>
                  <p>{title}</p>
                  <p>&#8377;{product.unit_price}</p>
                </div>
              </div>
            </Link>
          );
        })}
        
      </div>
      {count && 
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
      }
    </div>
  )
}
