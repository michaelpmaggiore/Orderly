import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Welcome to Orderly!</h1>
      <ul>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </div>
  );
}

export default HomePage;