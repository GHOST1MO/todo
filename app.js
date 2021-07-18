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



app.listen(port, () => console.log(`Example app listening on port ${port}!`))

