// YOUR CODE HERE:

var app = {};

app.init = function() {
  // sets default room on initilization to show all messages
  this.currentRoom = "All Rooms";
  this.server = 'http://127.0.0.1:3000/';
  this.mostRecentMessageTime = new Date("0");
  this.friendsList = [];
};

// sends the passed in message to the server
app.send = function(message) {
  $.ajax({
    url: app.server.concat("classes/messages"),
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/JSON',
    success: function(data) {
      console.log('chatterbox: Message Sent');
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message');
    }
  });
};

// gets the most recent 100 messages from the server
app.fetch = function() {
  $.ajax({
    url: app.server.concat("classes/messages"),
    type: 'GET',
    success: function(data) {
      app.prependNewMessages(data);
      console.log('chatterbox: Message Gotten');
    },
    error: function (data) {
      console.error('chatterbox: Failed to gotten message');
    }
  });
};

// removes all messages from the screen
app.clearMessages = function() {
  $("#chats").html('');
};

// prepends new messages retrieved from the server
// and ignores messages with harmful code
app.prependNewMessages = function(data) {

  // if there are no results in the data object, eject from prependNewMessages
  if (data.results.length === 0) {
    return;
  }

  // FACTORED OUT FOR SIMPLICITY WHEN HOOKING UP NODE SERVER
  // for each message
  _.each(data.results, function(msg) {
    // check if the message has malicious codez
    if (app.xssAttackPresent(msg)) {
    // otherwise as long as the message hasn't been added to the list of messages yet
    } else if (new Date(msg.createdAt) > app.mostRecentMessageTime &&
              app.checkRoom(msg.roomname)) {
      // prepend the message
      app.addMessage(msg);
    }
  });

  // _.each(data.results, function(msg) {
  //   app.addMessage(msg);
  // });
  // FACTORED OUT FOR SIMPLICITY WHEN HOOKING UP NODE SERVER
  // set the most recent message time to the most recent message received.
  app.mostRecentMessageTime = new Date(data.results[data.results.length - 1].createdAt);
};

// takes in a message.roomname
// returns true if the passed in room matches the current room
// or the default "All Rooms" which shows all messages
app.checkRoom = function(messageRoom) {
  if (app.currentRoom === "All Rooms" ||
      app.currentRoom === messageRoom) {
    return true;
  } else {
    return false;
  }
};

// Runs a series of regex tests on each value of the message
// returns true if the message contains malicious codez
// note: this is a higher order function that calls the
// list of RegEx tests listed in the regExTests function
app.xssAttackPresent = function(msg) {
  if (app.regExTests(msg.username)) {
    return true;
  } else if (app.regExTests(msg.text)) {
    return true;
  } else if (app.regExTests(msg.roomname)) {
    return true;
  }
  return false;
};

// Runs a series of regex tests on a given string.
app.regExTests = function(string) {
  // can add more regex tests here with ||
  if (secureReg.test(string) ||
      docReg.test(string)) {
    return true;
  } else {
    return false;
  }
};

// prepends a message to the DOM
app.addMessage = function(message) {
  $("#chats").prepend('<div class="message">'+
                      '<span class="username">' +
                      message.username +
                      '</span>' +
                      ' <span class="messageRoomName">' +
                      message.roomname +
                      '</span>' +
                      ' <span class="messages">' +
                      message.text +
                      '</span>' +
                      '</div>');


};

// searches all HTML DOM elements for messages
// whose username matches any username on the friends list
app.addFriendClass = function() {
  var allFriends = $('.username').filter(function() {
    return _.contains(app.friendsList, $(this).text());
  });

  allFriends.addClass('friend');
};

// adds a room to the select field
app.addRoom = function(roomname) {
  // create an array of all existing rooms
  var existingRooms = $(".rooms").filter(function() {
    return $(this).text() === roomname;
  });
  // if the passed in room does not exist and a roomname was provided
  if(existingRooms.length===0 && roomname !== undefined){
    // add the room to the list of rooms
    $("#roomSelect").append('<option class="rooms">' + roomname + '</option>');
  }
};

// adds a friend when you get one
app.addFriend = function(friend) {
  app.friendsList.push(friend);
};

// retrieves input values for username, text, and roomname
// from corresponding DOM elements
// then sends the message to the AJAX send method
app.handleSubmit = function() {
  var username = $('#username').val();
  var text = $('#message').val();
  var message = {username: username, text: text, roomname: app.currentRoom, createdAt: new Date()};
  app.send(message);
};

// listens for a click event on usernames
// event calls addFriend method
var readyUsernameOnClick = function() {
  $("#chats").on('click', ".username", function(friend) {
  app.addFriend($(this).text());
  app.addFriendClass();
  });
};

// listens for a click event on the submit button
// event triggers submit event
var readySubmitButtonClick = function() {
  $(".submit").on('click', function(event) {
    // prevents page refresh
    event.preventDefault();
    $(".submit").trigger('submit');
  });
};

// listens for submit action on the submit button
// triggers handleSubmit method to prepare and send message
var readySubmitButtonSubmit = function() {
  $(".submit").on('submit', function(event) {
    // prevents page refresh
    event.preventDefault();
    app.handleSubmit();
  });
};

// listens for click event on gotify button
// invokes app.fetch method to retrieve new messages
var readyGetMessagesClick = function() {
  $(".retrieve").on('click', function() {
    app.fetch();
  });
};

// extracts the username from the URL bar
var readyRetrieveUsername = function(){
   var queriedUsername = window.location.search;
   var name = usernameReg.exec(queriedUsername)[1];
   $("#username").val(name);
};

// listens for click event on room creation button
// invokes addRoom with the value in the newRoom textbox
var readyMakeNewRoom = function(){
  $("#newRoomButton").on('click', function(){
    app.addRoom($('#newRoomText').val());
    $('#newRoomText').val("");
  });
};

// sets the current room to the selected room
// and then fetches new messages
var readyEnterRoom = function(){
  $('#roomSelect').on("change", function(event){
    app.currentRoom = this.value;
    app.mostRecentMessageTime = new Date("0");
    app.clearMessages();
    app.fetch();
  });
};

// initializing all event listeners
// and does an initial fetch for messages
$(document).ready(function() {
  readyUsernameOnClick();
  readySubmitButtonClick();
  readySubmitButtonSubmit();
  readyGetMessagesClick();
  readyRetrieveUsername();
  readyMakeNewRoom();
  readyEnterRoom();
  app.init();
  app.fetch();
});
