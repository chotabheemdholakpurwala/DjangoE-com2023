import axios from "axios";
import { useState } from "react";
import jwt_decode from 'jwt-decode';
// Define the Login function.
export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [invalid, setInvalid] = useState(false);
  // Create the submit method.
  const submit = async (e) => {

    e.preventDefault();
    const user = {
    username: username,
    password: password,
    };
    // Create the POST requuest
    try {
      const { data } = await axios.post("/token/", user,
      {headers: {'Content-Type': 'application/json'}},
                    {withCredentials: true});

      // Initialize the access & refresh token in localstorage
      let decoded = jwt_decode(data.access);
      const cart = localStorage.getItem('cart');
      if(cart) {
        const response = await axios.post('transfer-cart-data/', {cart: JSON.parse(cart), user_id: decoded.user_id});
      }
      localStorage.clear();
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      let access_token = localStorage.getItem('access_token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      alert('User logged in.');
      console.log(decoded);
    } catch (e) {
        setInvalid(true);
      }
  };


  return (
    <div id='signup-page'>
      <div id='signup-container'>
          <h3>Login{invalid && <h3>Invalid Credentials!!!</h3>}</h3>
          <form onSubmit={(event) => submit(event)}>
            <input type='text' required placeholder='Username' onChange={(event) => setUsername(event.target.value)}/>
            <input type='password' required placeholder='password' onChange={(event) => setPassword(event.target.value)}/>
            <button type='submit'>Login</button>
          </form>
      </div>
    </div>
    // <div className="Auth-form-container">
    //   <form className="Auth-form" onSubmit={submit}>
    //     <div className="Auth-form-content">
    //       <h3 className="Auth-form-title">Sign In</h3>
    //       <div className="form-group mt-3">
    //         <label>Username</label>
    //         <input
    //           className="form-control mt-1"
    //           placeholder="Enter Username"
    //           name="username"
    //           type="text"
    //           value={username}
    //           required
    //           onChange={(e) => setUsername(e.target.value)}
    //         />
    //       </div>
    //       <div className="form-group mt-3">
    //         <label>Password</label>
    //         <input
    //           name="password"
    //           type="password"
    //           className="form-control mt-1"
    //           placeholder="Enter password"
    //           value={password}
    //           required
    //           onChange={(e) => setPassword(e.target.value)}
    //         />
    //       </div>
    //       <div className="d-grid gap-2 mt-3">
    //         <button type="submit" className="btn btn-primary">
    //         Submit
    //         </button>
    //       </div>
    //     </div>
    //   </form>
    //   {invalid && "Invalid Credentials!!!"}
    // </div>
  );
};