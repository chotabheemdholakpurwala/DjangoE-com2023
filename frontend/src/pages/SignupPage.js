import React, { useState } from 'react'
import axios from 'axios';

export default function SignupPage() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  async function SignUp(event) {
    event.preventDefault();
    if(password !== password2) {
      alert("passwords do not match");
    }
    else {
      try {
        const {data} = await axios.post('main/users/', {
          username: username, email: email, password: password
        });
        console.log(data);
        alert('User created!!!');
      } catch (e) {
        console.log("Error Creating User!!!", e);
        alert("NOOOO");
      }
      console.log('000000');
    }
  }

  return (
    <div id='signup-page'>
      <div id='signup-container'>
          <h3>Sign Up</h3>
          <form onSubmit={(event) => SignUp(event)}>
            <input type='text' required placeholder='Username' onChange={(event) => setUsername(event.target.value)}/>
            <input type='email' required placeholder='Email' onChange={(event) => setEmail(event.target.value)}/>
            <input type='text' required placeholder='password' onChange={(event) => setPassword(event.target.value)}/>
            <input type='text' required placeholder='confirm password' onChange={(event) => setPassword2(event.target.value)}/>
            <button type='submit'>SignUp</button>
          </form>
      </div>
      
    </div>
  )
}
