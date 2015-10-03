$(function() {
  $('#search-button').on('click', getTwitterHandle);
  $('.user-input').on('keypress', searchByEnter);
});

var getTwitterHandle = function() {
  var userInput = $('.user-input').val();
  if (userInput === '') {
    alert('Please enter a Twitter handle!')
  } else {
    $('.user-input').val('');
    sendToServer(userInput);
    renderMessage(userInput);
  }
};

var sendToServer = function(twitterHandle) {
  var baseUrl = '/search?handle=' + twitterHandle;
  var encodedURL = encodeURI(baseUrl);
  console.log("DISSSSSSSSSSSS IS DA URL: " + encodedURL);
  $.ajax({
    url: encodedURL,
    method: 'GET',
    json: true
  }).done(renderFollowers);
};

var renderFollowers = function(followers) {
  var followerTemplate = Handlebars.compile($('#follower-template').html());
  $('#follower-container').html(followerTemplate(followers));
  if (followers.status) {
    // Cheap way to render client side error messages
    $('#follower-container').html(followerTemplate({title: followers.message}));
  }
};

var renderMessage = function(searchedHandle) {
  $('#message-container').html('<p>You searched for @' + '<a href="http://twitter.com/' + searchedHandle + '" target="_blank">' + searchedHandle + '</a>' + '</p>')
};

var searchByEnter = function(e) {
  if (e.which === 13) {
    getTwitterHandle();
  }
};
