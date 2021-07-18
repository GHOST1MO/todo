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
const url = `mongodb://localhost/todo`
//connection to MongoDB
const connectMongoDB = async () => {
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
connectMongoDB();

//Connect to Mysql DB
const connectMysqlDB = async () => {
  try {
    await connection.authenticate();
    console.log('Connection to Mysql has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to Mysql database:', error);
  }
}
connectMysqlDB();

//Getting models
const User = require('./models/User');
const Todo = require('./models/Todo');

const UserSql = require("./models/mysql/User")(connection, sequelize);
const TodoSql = require("./models/mysql/Todo")(connection, sequelize);
connection.sync();


const checkUser = async (req, res, next) => {
  const user = req.get("user");
  console.log(user);
  var result = await User.find({ "username": user });
  console.log(result.length);
  if (!result.length) {
    res.send({ "status": "error", "msg": "user not exist" })
    return
  }
  req.userId = result[0]._id;
  console.log(req.userId);

  next();
}



app.listen(port, () => console.log(`Example app listening on port ${port}!`))

