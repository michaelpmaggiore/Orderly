import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function NewTodo() {
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [_id, setId] = useState('');
  const [name, setName] = useState('');
  const { projectId} = useParams();
  const [project, setProject] = useState(null);
  const mongoose = require('mongoose');
  const id = new mongoose.Types.ObjectId();

  useEffect(() => {
    fetch(`http://localhost:3001/project/${projectId}`)
      .then(response => response.json())
      .then(data => setProject(data));
  }, [projectId]);
  const handleSubmit = (event) => {
    event.preventDefault();

    const todo = {
      _id: new mongoose.Types.ObjectId(),
      description,
      name,
      completed,
      projectId,
    };

    fetch(`http://localhost:3001/project/${projectId}/todo`, { // Use project_id here
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    })
    .then(response => response.json())
    .then(data => {
      setDescription('');
      setName('');
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <li><Link to="/project">View all projects</Link></li>
      <li><Link to="/">Home Page</Link></li>
      <li><Link to={`/project/${projectId}/todo/`}>Todo list for current project</Link></li>

      <label>
        Description:
        <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
      </label>
      <label>
        Name:
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </label>
      <label>
        Completed:
        <input type="checkbox" checked={completed} onChange={e => setCompleted(e.target.checked)} />
      </label>
      <button type="submit">Add Todo</button>
    </form>
  );
}

export default NewTodo;