var db = require('../db');
var bluebird = require('bluebird');

var _id = 0;


module.exports = {

  messages: {
    // a function which produces all the messages
    get: function () {
      // var connection = db.database();
      // var queryString = "SELECT * FROM messages";
      // var queryArgs = [];
      // connection.query(queryString, queryArgs, function(err, rows, fields){
      //   if (err) console.log("query error");
      //   console.log("inside get query");
      //   console.log(rows);
      //   console.log(fields);
      // });
    },

    // a function which can be used to insert a message into the database
    post: function (message) {
      return new bluebird(function(resolve, reject) {
        console.log(message);
        var connection = db.database();
        console.log("THE TYPE OF THE DATE IS " + typeof message.createdAt);
        // var queryString = "SELECT username, id"

        var queryArgs = {messageid: ++_id, text: message.text, roomname: message.roomname, createdat: message.createdAt};
        // var queryString = "INSERT INTO messages (userid, text, roomname, createdat) VALUES (" + 12 + ", '" + message.text + "', '" + message.roomname + "')";
        var queryString = "INSERT INTO messages SET ?";
        connection.query(queryString, queryArgs, function(err, results){
          console.log("inside connection, results are:" + results);
        });
        connection.end();
        resolve(console.log("resolved promise"));
      });
    }
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

