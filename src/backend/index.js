import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import mongoose from 'mongoose';

// Import mongoose

// // Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/michaelDatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error', err));


const TodoSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    });

const ProjectSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    name: {
        type: String,
        required: true
    },
    todos: [TodoSchema]
    });

const Project = mongoose.model('Project', ProjectSchema);

const port = 3001;

const app = express();
const todosRouter = express.Router({ mergeParams: true });
const projectsRouter = express.Router();

app.use(cors());
app.use(express.json());

let todos = {};
let projects = {};

app.get('/test', (req, res) => {
    res.send('Backend is working');
  });


todosRouter.post('/todo', async (req, res) => {
    const project = await Project.findById(req.params.projectId);
    const todo = {
        name: req.body.name,
        description: req.body.description,
        completed: req.body.completed,
        project_id: req.params.projectId,
    };
    project.todos.push(todo);
    await project.save();
    res.status(201).json(todo);
});

todosRouter.get('/todo/:todoId', async (req, res) => {
    const project = await Project.findById(req.params.projectId);
    const todo = project.todos.id(req.params.todoId);
    res.json(todo);
});

todosRouter.delete('/todo/:todoId', async (req, res) => {
    const project = await Project.findById(req.params.projectId);
    project.todos.id(req.params.todoId).remove();
    await project.save();
    res.status(204).end();
});

todosRouter.put('/todo/:todoId', async (req, res) => {
    const project = await Project.findById(req.params.projectId);
    const todo = project.todos.id(req.params.todoId);
    Object.assign(todo, req.body);
    await project.save();
    res.json(todo);
});

todosRouter.get('/todo', async (req, res) => {
    const projectId = req.params.projectId;
    const project = await Project.findById(projectId);
    if (project && project.todos) {
        res.json(project.todos);
    } else {
        res.status(404).json({ message: 'Todos not found for this project' });
    }
});

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the API. Available routes are:',
        routes: {
            projects: '/project',
            projectById: '/project/:projectId',
            todosByProjectId: '/project/:projectId/todo',
            todoById: '/project/:projectId/todo/:todoId'
        }
    });
});

projectsRouter.get('/project', async (req, res) => {
    const allProjects = await Project.find({});
    res.json(allProjects);
});

projectsRouter.post('/project', async (req, res) => {
    const project = new Project({
        name: req.body.name,
        todos: []
    });
    await project.save();
    res.status(201).json(project);
});

projectsRouter.get('/project/:projectId', async (req, res) => {
    const project = await Project.findById(req.params.projectId);
    res.json(project);
});

projectsRouter.delete('/project/:projectId', async (req, res) => {
    await Project.findByIdAndDelete(req.params.projectId);
    res.status(204).end();
});

projectsRouter.put('/project/:projectId', async (req, res) => {
    const project = await Project.findByIdAndUpdate(req.params.projectId, req.body, { new: true });
    res.json(project);
});

app.use('/', projectsRouter);
app.use('/project/:projectId/', todosRouter);

app.listen(port, () => {
    console.info(`Server is running at http://localhost:${port}/project`)
});