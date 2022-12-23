// https://todoassignment.nachikettekade.repl.co live link 

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//Todo model

class Todo{
  constructor(id, title,description,completed, priority, dueDate){
    this.id = id;
    this.title= title;
    this.description = description;
    this.completed = completed;
    this.priority = priority;
    this.dueDate = dueDate;
    
  }
}

// In-memory todo list
let todos = [
  new Todo(123,"Play red dead redemption2","really intresting game.",false,3,"Sat Dec 10 2022 04:08:42 GMT+0000 (Coordinated Universal Time)"),
  new Todo(124, 'Do laundry', 'Wash and fold clothes.', false, 1, 'Sun Dec 11 2022 04:08:42 GMT+0000 (Coordinated Universal Time)'),
  new Todo(125, 'Play Valorant', 'Push rank to Immortal', true, 3, 'Sat Dec 10 2022 04:08:42 GMT+0000 (Coordinated Universal Time)')
];

// Use body-parser to parse request body 
app.use(bodyParser.urlencoded({extend:true}));
app.use(bodyParser.json());

// GET /api/todo
app.get('/api/todo', (req,res) =>{
  res.status(200).json(todos);
});

// GET /api/todo/:id
app.get('/api/todo/:id', (req,res) =>{
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if(!todo){
    res.staus(404).send("Todo not found");
  }
  else{
    res.status(200).json(todo);
  }
});

//POST /api/todo
app.post('/api/todo',(req,res)=>{
  //validate request
  if(!req.body.title){
    res.status(400).send("Title is required");
    return;
  }
  //create todo 
   const todo = new Todo(
     todos.length +1,
     req.body.title,
     req.body.description,
     req.body.completed || false,
     req.body.priority || 1,
     req.body.dueDate
   );
  todos.push(todo);
  res.status(201).json(todo);
    
});

app.put("/api/todo/:id",(req, res)=>{
  const todo = todos.find(t=> t.id === parseInt(req.params.id));
  if(!todo){
    res.status(404).send("Todo not found");
  }
  else{
    //update todo
    todo.title = req.body.title;
    todo.description = req.body.description;
    todo.completed = req.body.completed;
    todo.priority = req.body.priority;
    todo.dueDate = req.body.dueDate;
    res.status(200).json(todo);
    
  }
});

app.delete("/api/todo/:id",(req,res) =>{
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if(!todo){
    res.status(404).send("Todo not found");
  }
  else{
    const index = todos.indexOf(todo);
    todos.splice(index,1);
    res.status(200).send("Todo Deleted");

  }
});
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(port));
