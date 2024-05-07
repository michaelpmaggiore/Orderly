import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/project`)
      .then(response => response.json())
      .then(data => setProjects(data));
  }, []);

  return (
<ul>
        <li><Link to="/project/new">Create a new project</Link></li>
        <li><Link to="/">Home Page</Link></li>

        | ID | Project Name | Todos |
      {projects.map(project => (
        <li key={project.id}> 
          {project._id} | 
          <Link to={`/project/${project._id}`}>{project.name}</Link> | 
          {project.todos.map(todo => <span key={todo._Id}>{todo.description}</span>)}
        </li>
      ))}
    </ul>
  );
}

export default ProjectList;