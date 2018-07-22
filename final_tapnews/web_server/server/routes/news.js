var express = require('express');
var router = express.Router();
var rpc_client = require('../rpc_client/rpc_client');

router.get('/userId/:userId/pageNum/:pageNum', function(req, res, next) {
	var user_id = req.params['userId'];
	var page_num = req.params['pageNum'];

	rpc_client.getNewsSummariesForUser(user_id, page_num, function(response){
		res.json(response);
	});
});

router.get('/userId/:userId/topic/:topic/pageNum/:pageNum', function(req, res, next) {
	var user_id = req.params['userId'];
	var page_num = req.params['pageNum'];
	var topic = req.params['topic'];

	rpc_client.getNewsSummariesForUserWithTopic(user_id, page_num, topic, function(response){
		res.json(response);
	});
});

router.get('/userId/:userId/pageNum/:pageNum/search/:keyword', function(req, res, next){
	var user_id = req.params['userId'];
	var page_num = req.params['pageNum'];
	var keyword = req.params['keyword'];

	rpc_client.getNewsSummariesForUserWithKeyword(user_id, page_num, keyword, function(response){
		res.json(response);
	})
});

router.get('/userId/:userId/list/:list', function(req, res, next){
	var user_id = req.params['userId'];
	var list = req.params['list'];
	rpc_client.getNewsSummariesForUserLikeList(user_id, function(response){
		res.json(response);
	})
});

/* Log news click. */
router.post('/userId/:userId/newsId/:newsId', function(req, res, next) {
	user_id = req.params['userId'];
	news_id = decodeURIComponent(req.params['newsId']);
	rpc_client.logNewsClickForUser(user_id, news_id);
	res.status(200);
});

module.exports = router;
