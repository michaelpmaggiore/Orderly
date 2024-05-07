import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function NewProject() {
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);
    const [_id, setId] = useState('');
    const [name, setName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const project = {
      _id,
      name,
    };

    fetch(`http://localhost:3001/project`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setName('');
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <li><Link to="/project">View all projects</Link></li>
      <li><Link to="/">Home Page</Link></li>

      <label>
        Name:
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </label>
      
      <button type="submit">Add Project</button>
    </form>
  );
}

export default NewProject;