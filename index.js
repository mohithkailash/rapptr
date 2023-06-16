var express = require("express");
const mongoose = require('mongoose');
var app = express();
const bodyParser = require('body-parser');
// Import the todo schema
const { Todo, User } = require('./models/todo');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Create a connection string
const connectionString = 'mongodb://localhost:27017/mydb';

// connection with mongoDB
mongoose.connect(connectionString,{
    useNewUrlParser:true,useUnifiedTopology:true
},(err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("DB successfully connected")
    }
})
app.get('/',function(req,res){
    res.send("Hello, Welcome to Node.js project");
});

// Create a new user
app.post('/users/add', function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
  
    // Create a new user object
    const newUser = new User({
      username: username ,
      password : password
    });
  
    // Save the user object to the database
    newUser.save(function(err, savedUser) {
      if (err) {
        console.error(err);
        res.status(500).send('Error while creating the user');
      } else {
        res.send('User created successfully');
      }
      console.log(User)
    });
  });

// Get all users
app.get('/users/all', function(req, res) {
    User.find({}, function(err, users) {
      if (err) {
        console.error(err);
        res.status(500).send('Error while retrieving users');
      } else {
        res.json(users);
      }
    });
  });

// 1. Add a to-do
app.post('/users/addtodos',function(req,res){
    const username = req.body.username;
    const todo = req.body.todo; 
    

  // Generate a unique ID for the todo task
  const todoId = mongoose.Types.ObjectId();

  // Create a new todo task
  const newTodo = new Todo({
    _id: todoId,
    todo: todo
  });

  User.findOne({ username: username }, function(err, user) {
    if (err) {
      console.error(err);
      
      res.status(500).send('Error while finding the user');
    } else if (!user) {
      res.status(404).send('User not found');
    } else {
      user.todos.push(newTodo);

      user.save(function(err, savedUser) {
        if (err) {
          console.error(err);
          res.status(500).send('Error while adding the todo task');
        } else {
          res.send('Todo task added successfully');
        }
      });
    }
  });
});

// 2. Change a to-do
app.post('/users/change/:todoid',function(req,res){
    const username = req.body.username;
    const todoid = req.params.todoid;
    // Get the user from the database
    User.findOne({ username: username }).then(function(user) {
        // Check if the user exists
        if (user) {
            // Get the todo task from the user's todos array
            const todo = user.todos.find((todo) => todo._id.toString() === todoid);
            console.log(todoid)

            // Check if the todo task exists
            if (todo) {
                // Update the todo task
                todo.todo = req.body.todo;
                user.save();

                // Send a success message
                res.send("Task updated");
            } else {
                // Send an error message
                res.send("Todo task not found");
            }
        } else {
            // Send an error message
            res.send("User not found");
        }
    }).catch(function(err) {
        // Handle the error
        res.send(err);
    });

});

// 3. Delete a to-do (do a soft delete)
app.delete('/users/todo/:todoid',function(req,res){
    const username = req.body.username;
  const todoid = req.params.todoid;

  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        res.status(404).send('User not found');
      } else {
        const todoIndex = user.todos.findIndex((todo) => todo._id.toString() === todoid);

        if (todoIndex === -1) {
          res.status(404).send('Todo task not found');
        } else {
          user.todos.splice(todoIndex, 1);

          user.save()
            .then((savedUser) => {
              res.send('Todo task deleted successfully');
            })
            .catch((err) => {
              console.error(err);
              res.status(500).send('Error while deleting the todo task');
            });
        }
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error while finding the user');
    });
});

// 4. List all todos
app.get('/users/todo/all',function(req,res){
    const username = req.body.username;

    User.findOne({ username: username })
      .then((user) => {
        if (!user) {
          res.status(404).send('User not found');
        } else {
          res.send(user.todos);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error while finding the user');
      });
});

// 5. Return a todo
// Assuming the first todo is expected 
app.get('/user/first',function(req,res){
    const username = req.body.username;

    User.findOne({ username: username })
      .then((user) => {
        if (!user) {
          res.status(404).send('User not found');
        } else {
          const firstTodo = user.todos.length > 0 ? user.todos[0] : null;
  
          if (!firstTodo) {
            res.status(404).send('No todo tasks found');
          } else {
            res.send(firstTodo);
          }
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error while finding the user');
      });
});

// 6. login
// Using basic other authentication to keep it simple
// Token-based or Session-based authentication can be added if needed
app.post('/login',function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        res.status(404).send('User not found');
      } else {
        // Compare the provided password with the stored password
        if (password === user.password) {
          res.send('Login successful');
        } else {
          res.status(401).send('Invalid password');
        }
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error while finding the user');
    });
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });