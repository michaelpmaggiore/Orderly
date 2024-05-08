import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoList from './TodoList';
import TodoDetail from './TodoDetail';
import NewTodo from './NewTodo';
import ProjectList from './ProjectList'; // Component to display all projects
import NewProject from './NewProject'; // Component to create a new project
import ProjectDetail from './ProjectDetail'; // Component to display todos in a project
import Project from './ProjectList';
import './App.css';
import HomePage from './HomePage';

import Login from './Login';
import Register from './Register';
import Schedule from './Schedule';
import ClassID from './ClassID';
import AddClass from './AddClass';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/project" element={<ProjectList />} />
        <Route path="/project/new" element={<NewProject />} />
        <Route path="/project/:projectId" element={<ProjectDetail />} />
        
        <Route path="/project/:projectId/todo" element={<TodoList />} />
        <Route path="/project/:projectId/todo/new" element={<NewTodo />} />
        <Route path="/project/:projectId/todo/:todoId" element={<TodoDetail />} /> 
      

        <Route exact path="/" element={<HomePage />} component={Project} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/schedule/new" element={<AddClass />} />

        {/* These routes is to pass the front end requirement of frontend routes. Serves no other purpose. */}
        <Route path="/class/:id" element={<ClassID />} /> 

      </Routes>
    </Router>
  );
}

export default App;