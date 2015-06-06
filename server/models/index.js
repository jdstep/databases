var db = require('../db');




module.exports = {

  messages: {
    get: function () {}, // a function which produces all the messages

    // a function which can be used to insert a message into the database
    post: function (message) {
      console.log(message);
      var connection = db.database();
      var queryArgs = [message.text, message.roomname, message.createdAt];
      var queryString = "INSERT INTO messages VALUES(text, roomname, createdAt)";
      // connection.query(queryString, queryArgs, function(err, result){
      //   console.log("query successful! result is: " + result);
      // });
      connection.query(queryString, queryArgs);
    }
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

