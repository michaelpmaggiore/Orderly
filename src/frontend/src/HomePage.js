import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Welcome to Orderly!</h1>
      <ul>
        <li><Link to="/project">View all projects</Link></li>
        <li><Link to="/project/new">Create a new project</Link></li>
        <li><Link to="/login">Login</Link></li>
        {/* Add more links as needed */}
      </ul>
    </div>
  );
}

export default HomePage;