import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [project, setProject] = useState(null);
  const { projectId} = useParams();

  useEffect(() => {
    fetch(`http://localhost:3001/project/${projectId}`)
      .then(response => response.json())
      .then(data => setProject(data));
  }, [projectId]);

  useEffect(() => {
    fetch(`http://localhost:3001/project/${projectId}/todo`)
      .then(response => response.json())
      .then(data => setTodos(data));
  }, [projectId]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      <li><Link to="/project">View all projects</Link></li>
      <li><Link to="/">Home Page</Link></li>
      <li><Link to={`/project/${projectId}/todo/new`}>Add new todo</Link></li>
      <li>Todos: </li>
      Name | Description | Completed
      {Array.isArray(todos) && todos.map(todo => (
        <li key={todo._Id}>{todo.name} | {todo.description} | {todo.completed.toString()}</li>
      ))}
    </ul>
  );
}

export default TodoList;