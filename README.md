# Hello, this to-do API list is built for screening purposes at Rapptr. 

### As I have given the oppourtnity to use any programming language/backend framework, I picked nodejs/expressjs and MongoDB

### All the API endpoints code can be found in index.js and the database schema in /models/todo.js. All functions have been tested using postman.

### Here are the requirements for the API:

1. Add a to-do
2. Change a to-do
3. Delete a to-do (do a soft delete)
4. List all todos
5. Return a todo
6. login
7. return a user

## Here, everyuser have separate to-do lists in the database
  - User
    - username
    - password
    - todos
       - todoid
       - todo task

## Instructions to run the project
1. Install nodejs
2. After opening the project folder, use ``` npm install ``` command to install the dependencies.
3. Use  ``` nodemon index.js ``` the following command to run server at port 3000

 
# The following are the demos of API endpoints

## Create a user
![1](https://github.com/mohithkailash/rapptr/blob/1dccacb6877e8d0e2cd641a8d65f242eca99ee01/screenshots/create%20user.png)

## Add a todo
![2](https://github.com/mohithkailash/rapptr/blob/949ffdad55b32644ad00955dac11dde734fe52c1/screenshots/todo%20added.png)

## Modify a todo
![3](https://github.com/mohithkailash/rapptr/blob/949ffdad55b32644ad00955dac11dde734fe52c1/screenshots/task%20update.png)

## Delete a to-do 
![4](https://github.com/mohithkailash/rapptr/blob/949ffdad55b32644ad00955dac11dde734fe52c1/screenshots/task%20delete.png)

## List all todos
![5](https://github.com/mohithkailash/rapptr/blob/949ffdad55b32644ad00955dac11dde734fe52c1/screenshots/listalltodos.png)

## Return a todo
![6](https://github.com/mohithkailash/rapptr/blob/949ffdad55b32644ad00955dac11dde734fe52c1/screenshots/return%20a%20todo.png)

## Login
![7](https://github.com/mohithkailash/rapptr/blob/1dccacb6877e8d0e2cd641a8d65f242eca99ee01/screenshots/login.png)

