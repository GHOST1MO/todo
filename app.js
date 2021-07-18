const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.use(express.json())
const port = 3000
const url = `mongodb://localhost/todo`
//connection to DB
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log(`MongoDB is connected: ${connection.connection.host}`)
  } catch (err) {
    console.log('Error with MongoDB');
    process.exit(1)

  }
}
connectDB();
//Getting models
const User = require('./models/User');
const Todo = require('./models/Todo');

const checkUser = async (req, res,next) =>{
  const user = req.get("user");
  console.log(user);
  var result = await User.find({"username": user});
  console.log(result.length);
  if (!result.length){
    res.send({"status":"error","msg":"user not exist"})
    return
  }
  req.userId = result[0]._id;
  console.log(req.userId);

  next();
}


//Routes
//get todo info
app.get('/get-info',checkUser, async (req, res) => {
  const id = req.body.id;
  const userId = req.userId.toString();
  const todo = await Todo.find({_id:id,userId:userId});
  console.log(todo);
  console.log({_id:id,userId:userId});
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
  console.log(subject);
  if (!subject){
    res.send({"status":"error"})
    return;
  }
  const todo = new Todo({
    subject:subject,
    userId: req.userId,
  });
  const doc = await todo.save() 
  res.send(doc)
})

//delete todo
app.delete('/delete-todo',checkUser, async (req, res) => {
  const id = req.body.id;
  const userId = req.userId;
  console.log(id);
  if (!id){
    res.send({"status":"error"})
    return;
  }
  var check = await Todo.find({_id:id,userId:userId})
  console.log(check);
  if (!check.length){
    res.send({
      "status":"error",
      "msg":"No todo exist"})
      return;
  }
  Todo.deleteOne({_id:id,userId:userId},(err) =>{
    if(err){
      res.send({
        "status":"error",
        "msg":err})
        return;
    }
    res.send("deleted")

})

})

//update todo
app.patch('/update-todo',checkUser , (req, res) => {
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
  Todo.updateOne({"_id":id,"userId":userId}, { "subject": subject }, async function(err, ress) {
    res.send(await Todo.findById(id));
  });

})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

