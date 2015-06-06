var models = require('../models');
var bluebird = require('bluebird');


module.exports = {
  messages: {
    // a function which handles a get request for all messages
    get: function (req, res) {
      console.log("get request inside message controller");
      //pull all messages from the database
      //parse them from SQL into objects? strings?
      //store the messages in a results object
      //return results
      // response.results = [{username: peter, text: "I like swiss"..} {username: jd..}]
      res.end();
    },
    post: function (req, res) {
      console.log("post request inside message controller");
      var message = req.body;
      // console.log(message);
      // insert promise here?
      models["messages"].post(message)
        .then(res.end);
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      console.log("get request inside user controller");
      res.end();
    },
    post: function (req, res) {
      console.log("post request inside user controller");
      res.end();
    }
  }


};

