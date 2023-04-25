import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import ProductImage from './ProductImage';
import ProductDetails from '../pages/ProductDetails';
import { UserContext } from '../App';
import RelatedProducts from './RelatedProducts';
import AddToCartIcon from '../icons/add-to-cart-icon.svg';
import ProductImages from './ProductImages';

export default function Product() {

  const { user, updateUser } = useContext(UserContext);
  const { id } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    (async () => {
      const {data} = await axios.get(`products/${id}`);
      setProduct(data);
    })();
  }, [id]);

  async function addToCart() {
    try {
      if(user) {
        console.log(user.cart);
        let cart_id = user.cart;
        if(user.cart === null) {
          const {data} = await axios.post('/carts/');
          cart_id = data.id;
          console.log('Cart Created!!!');
          updateUser({ ...user, cart: data.id });
        }
        const quantity = 1;
        await axios.post(`http://127.0.0.1:8000/carts/${cart_id}/items/`, { product_id: id, quantity: quantity });
        console.log('POST request successful');
        alert("Product Added To Cart");
      }
      else {
        let cart = localStorage.getItem('cart');
        if(!cart) {
          cart = [{product_id: parseInt(id), quantity: 1}];
        }
        else {
          cart = JSON.parse(cart); // Parse the cart data from localStorage
          const existingItem = cart.find(item => item.product_id === parseInt(id));
          if (existingItem) {
            existingItem.quantity += 1; // Increase quantity by one
          } else {
            cart = cart.concat([{ product_id: parseInt(id), quantity: 1 }]);
          }
        }
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    } catch (error) {
      console.error('Error making POST request:', error);
    }
  }

  return (
    <div>
      <div className='product'>
        <div className='product-images'>
          <ProductImages id={id} key={id} />
          <div className='image'>
            <ProductImage product_id={id} key={id} />
          </div>
          
        </div>
        <div className='product-info'>
          <div className='title'>{product?.title}</div>
          <div className='price'>&#8377;{product?.unit_price}</div>
          <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>
          <button onClick={(event) => addToCart(product.id, event)}>
            <img className='add-to-cart-icon' src={AddToCartIcon} /><span>ADD TO CART</span>
          </button>
        </div>
      </div>
      <div>
        {product && <RelatedProducts collection_id={product.collection} />}
      </div>
    </div>
  )
}
