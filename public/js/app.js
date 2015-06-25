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
	$.ajax({
		url: baseUrl,
		method: 'GET',
		json: true
	}).done(renderFollowers);
};

var renderFollowers = function(followers) {
	var followerTemplate = Handlebars.compile($('#follower-template').html());
	$('#follower-container').html(followerTemplate(followers));
};

var renderMessage = function(searchedHandle) {
	$('#message-container').html('<p>You searched for @' + searchedHandle + '</p>')
};

var searchByEnter = function(e) {
	if (e.which === 13) {
		getTwitterHandle();
	}
};