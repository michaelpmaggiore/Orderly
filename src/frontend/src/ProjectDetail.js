import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function ProjectDetail() {
  const [project, setProject] = useState(null);
  const { projectId} = useParams();

  useEffect(() => {
    fetch(`http://localhost:3001/project/${projectId}`)
      .then(response => response.json())
      .then(data => setProject(data));
  }, [projectId]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <li><Link to="/project">View all projects</Link></li>
      <li><Link to="/">Home Page</Link></li>
      <h2>{project.name}</h2>
      <li><Link to={`/project/${projectId}/todo`}>Todos</Link></li>
      Todo Name | Todo Description
      {project.todos.map((todo, index) => (
        <p key={todo._Id}>{todo.name} | {todo.description}</p>
      ))}
    </div>
  );
}

export default ProjectDetail;