const express = require('express')
const mongoose = require('mongoose')
const sequelize = require("sequelize");
const connection = new sequelize('todo', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});



const app = express()

app.use(express.json())
const port = 3000




const User = require("./models/mysql/User")(connection, sequelize);
const Todo = require("./models/mysql/Todo")(connection, sequelize);
Todo.belongsTo(User, {foreignKey: 'userId'});
connection.sync();


const checkUser = async (req, res, next) => {
  const user = req.get("user");
  var result = await User.findAll({ where:{"username": user} });
  if (!result.length) {
    res.send({ "status": "error", "msg": "user not exist" })
    return
  }
  req.userId = result[0].id;
  console.log(req.userId);

  next();
}


//Routes
//get todo info
app.get('/get-info',checkUser, async (req, res) => {
  const id = req.body.id;
  const userId = req.userId.toString();
  const todo = await Todo.findAll({where: {id,userId}});
  if (!todo.length){
    res.send({
      "status":"error",
      "msg":"No todo exist"})
      return;
  }
  
  res.send(todo[0]);
})


//Add New todo
app.post('/add-todo',checkUser, async (req, res) => {
  const subject = req.body.subject;
  if (!subject){
    res.send({"status":"error"})
    return;
  }
  const row = await Todo.create({
    subject,
    userId: req.userId,
  });

  res.send(row)
})

//delete todo
app.delete('/delete-todo',checkUser, async (req, res) => {
  const id = req.body.id;
  const userId = req.userId;
  console.log(id);
  if (!id){
    res.send({"status":"error","msg":"id needed"
  })
    return;
  }
  var check = await Todo.findAll({where: {id,userId}});
  if (!check.length){
    res.send({
      "status":"error",
      "msg":"No todo exist"
    })
      return;
  }
  await Todo.destroy({where:{id,userId}})
  res.send("deleted")

})

//update todo
app.patch('/update-todo',checkUser , async (req, res) => {
  const subject = req.body.subject;
  const id = req.body.id;
  const userId = req.userId;
  if (!subject){
    res.send({"status":"error",msg:"need sub"});
    return;
  }
  if (!id){
    res.send({"status":"error",msg:"need todo id"});
    return;
  }
  await Todo.update({ subject },{where:{id,userId}})
  res.send(await Todo.findByPk(id));

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

