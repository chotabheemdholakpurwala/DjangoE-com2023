import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import {Login} from "./components/Login";
import {Logout} from "./components/Logout";
import { useEffect, useState, createContext } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import SignupPage from './pages/SignupPage';

export const UserContext = createContext();

function App() {

  const [user, setUser] = useState();

  useEffect(() => {
    (async () => {
      try {
        let access_token = localStorage.getItem('access_token');
        let decoded = jwt_decode(access_token);
        let response = await axios.get(`main/users/${decoded.user_id}`);
        updateUser(response.data);
      } catch (e) {
        setUser(null);
      }
    })();
  }, []);

  const updateUser = (userData) => {
    setUser(userData);
  }

  return (
    <div className="App">
      <UserContext.Provider value={{ user, updateUser }}>
        <Router>
          <Routes>
            <Route path='/*' element={<Homepage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/signup' element={<SignupPage />} />
          </Routes>
        </Router>
      </UserContext.Provider>
      
    </div>
  );
}

export default App;
