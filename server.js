var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var bodyParser = require('body-parser');
var logger = require('morgan');
var app = express();

if (process.env.NODE_ENV !== 'test') {
  app.use( logger('dev') );
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./public'));

// Get Number of Twitter Followers Based on Twitter Handle
app.get('/search', function(req, res) {
	// Get and store search query from front-end input
	var twitterHandle = (req.query.handle);
  console.log(twitterHandle);
	request({
		uri: 'https://twitter.com/' + twitterHandle,
		json: true
	}, function (error, response, html) {
		if (!error && response.statusCode == 200) {
			// Load HTML from Cheerio Scraper
			var $ = cheerio.load(html);
			// Store Data from Targeted DOM Elements
			var followerHtml = $('li.ProfileNav-item.ProfileNav-item--followers').children();
      console.log("FOLLOWER?", followerHtml);
      if (followerHtml.length === 0) {
        res.json({ status: 404, message: "Not a valid username."});
      } else {
        // Parse and store follower information
  			var followers = followerHtml[0].attribs;
        console.log(followers);
  			// Send back the follower count
  			res.send(followers);
      }
		}
	});
});

app.listen(process.env.PORT || 8080, function() {
  console.log('Server running on port 8080...');
});
