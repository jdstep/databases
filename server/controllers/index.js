var bluebird = require('bluebird');
var models = bluebird.promisifyAll(require('../models'));



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

    // a function which handles posting a message to the database
    post: function (req, res) {
      console.log("post request inside message controller");
      var message = req.body;

      models["messages"].post(message).then(function(){
        console.log("we tried");
        res.end();
      });
    }
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

