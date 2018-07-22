var jayson = require('jayson');

var client = jayson.client.http({
	port: 4040,
	host: 'localhost'
});

//Test RPC method
function add(a, b, callback){
	client.request('add', [a, b], function(err, error, response){
		if(err) throw err;
		callback(response);
	});
}

// Get news summaries for a user
function getNewsSummariesForUser(user_id, page_num, callback) {
  client.request('getNewsSummariesForUser', [user_id, page_num], function(err, error, response) {
    if (err) throw err;
    callback(response);
  });
}

// Get news summaries for a user with topic
function getNewsSummariesForUserWithTopic(user_id, page_num, topic, callback) {
  client.request('getNewsSummariesForUserWithTopic', [user_id, page_num, topic], function(err, error, response) {
    if (err) throw err;
    callback(response);
  });
}

//Get news summaries for a user with keyword
function getNewsSummariesForUserWithKeyword(user_id, page_num, keyword, callback){
  client.request('getNewsSummariesForUserWithKeyword', [user_id, page_num, keyword], function(err, error, response){
    if(err) throw err;
    callback(response);
  })
}

// Log a news click event for a user
function logNewsClickForUser(user_id, news_id) {
    client.request('logNewsClickForUser', [user_id, news_id], function(err, error, response) {
        if (err) throw err;
    });
}

function addNewsToUserLikelist(user_id, news_id){
  client.request('addNewsToUserLikelist', [user_id, news_id], function(err, error, response){
    if(err) throw err;
  })
}

function removeNewsFromUserLikelist(user_id, news_id){
  client.request('removeNewsFromUserLikelist', [user_id, news_id], function(err, error, response){
    if(err) throw err;
  })
}

function getUserPreferenceModel(user_id, callback){
  client.request('getUserPreferenceModel', [user_id], function(err, error, response){
    if(err) throw err;
    callback(response);
  })
}

function setUserPreferenceModel(user_id, data, callback){
  client.request('setUserPreferenceModel', [user_id, data], function(err, error, response){
    if(err) throw err;
    callback(response);
  })
}

function getNewsSummariesForUserLikeList(user_id, callback){
  client.request('getNewsSummariesForUserLikeList', [user_id], function(err, error, response){
    if(err) throw err;
    callback(response);
  })
}

module.exports = {
  add: add,
  getNewsSummariesForUser: getNewsSummariesForUser,
  getNewsSummariesForUserWithTopic: getNewsSummariesForUserWithTopic,
  getNewsSummariesForUserWithKeyword: getNewsSummariesForUserWithKeyword,
  logNewsClickForUser: logNewsClickForUser,
  getUserPreferenceModel: getUserPreferenceModel,
  setUserPreferenceModel: setUserPreferenceModel,
  addNewsToUserLikelist: addNewsToUserLikelist,
  removeNewsFromUserLikelist: removeNewsFromUserLikelist,
  getNewsSummariesForUserLikeList: getNewsSummariesForUserLikeList
};
