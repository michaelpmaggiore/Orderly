import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function TodoDetail() {
  const [todo, setTodo] = useState(null);
  const { projectId, todoId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3001/project/${projectId}/todo/${todoId}`)
      .then(response => response.json())
      .then(data => setTodo(data));
  }, [projectId, todoId]);

  if (!todo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>{todo.completed ? 'Completed' : 'Not completed'}</p>
    </div>
  );
}

export default TodoDetail;