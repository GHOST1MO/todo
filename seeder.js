
var seeder = require('mongoose-seed');

// Connect to MongoDB via Mongoose
seeder.connect('mongodb://localhost/todo', function () {

  // Load Mongoose models
  seeder.loadModels([
    'models/Todo.js',
    'models/User.js'
  ]);

  // Clear specified collections
  seeder.clearModels(['Todo', 'User'], function () {

    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function () {
      seeder.disconnect();
    });

  });
});

// Data array containing seed data - documents organized by Model
var data = [
  {
    'model': 'User',
    'documents': [{
      "_id": "60f38e0e1ca79f1e6067ad84",
      "username": "abd"
    }, {
      "_id": "60f38ea5ca85da4184a8f4b1",
      "username": "abdullah"
    }, {
      "_id": "60f3953e8f5fa93a14bd0d9a",
      "username": "Ella"
    }]
  },
  {
    'model': 'Todo',
    'documents': [{
      "_id": "60f3a304cd6ab1438cda6bea",
      "done": false,
      "subject": "go home ella for get",
      "userId": "60f3953e8f5fa93a14bd0d9a"
    }, {
      "_id": "60f3a30ecd6ab1438cda6bed",
      "done": false,
      "subject": "by milk",
      "userId": "60f3953e8f5fa93a14bd0d9a"
    }, {
      "_id": "60f3a31dcd6ab1438cda6bf1",
      "done": false,
      "subject": "by milk",
      "userId": "60f38e0e1ca79f1e6067ad84"
    }, {
      "_id": "60f3a32acd6ab1438cda6bf4",
      "done": false,
      "subject": "buy copmuter",
      "userId": "60f38e0e1ca79f1e6067ad84"
    }, {
      "_id": "60f3a332cd6ab1438cda6bf7",
      "done": false,
      "subject": "buy vigatable",
      "userId": "60f38e0e1ca79f1e6067ad84"
    }, {
      "_id": "60f3a345cd6ab1438cda6bfb",
      "done": false,
      "subject": "buy vigatable",
      "userId": "60f38ea5ca85da4184a8f4b1"
    }, {
      "_id": "60f3a34fcd6ab1438cda6bfe",
      "done": false,
      "subject": "check list",
      "userId": "60f38ea5ca85da4184a8f4b1"
    }]
  }
];