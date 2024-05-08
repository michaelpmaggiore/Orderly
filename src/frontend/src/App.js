import React, { useState } from 'react';
import { useNavigate, Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';
import UserContext from './UserContext';

import Login from './Login';
import Register from './Register';
import Schedule from './Schedule';
import ClassID from './ClassID';
import AddClass from './AddClass';

function App() {
  const [userId, setUserId] = useState(null);
    function LogoutButton() {
      const navigate = useNavigate();
    
      const handleLogout = () => {

        navigate('/login');
      };
    
      return (
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      );
    }
  
  

  return (
    <UserContext.Provider value={{userId, setUserId}}>
      <Router>
        <LogoutButton />

        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/register" element={<Register />} />
          <Route path="/schedule/:userId" element={<Schedule />} />
          <Route path="/schedule/new/:userId" element={<AddClass />} />

          {/* These routes is to pass the front end requirement of frontend routes. Serves no other purpose. */}
          <Route path="/class/:id" element={<ClassID />} /> 

        </Routes>
      </Router>

    </UserContext.Provider>

  );
}

export default App;