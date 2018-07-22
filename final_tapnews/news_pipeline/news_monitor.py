# -*- coding: utf-8 -*

import datetime
import hashlib
import os
import redis
import sys

# Import common package in parent directory
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))

# News API
import news_api_client
#CloudAMQP
from CloudAMQP_client import CloudAMQPClient

# Redis
REDIS_HOST = 'localhost'
REDIS_PORT = 6379

NEWS_TIME_OUT_IN_SECONDS = 3600 * 24 * 1
SLEEP_TIME_IN_SECONDS = 10

SCRAPE_NEWS_TASK_QUEUE_URL = 'amqp://fnidwrfk:de_m9ba52iYJy0TW0-VMuaSY1QZZzsxX@otter.rmq.cloudamqp.com/fnidwrfk'
SCRAPE_NEWS_TASK_QUEUE_NAME = 'tap-news-scrape-news-task-queue'

# NEWS_SOURCES = ['cnn']
NEWS_SOURCES = [
    'bbc-news',
    'bbc-sport',
    'cnn',
    'entertainment-weekly',
    'espn',
    'financial-times',
    'fox-sports',
    'ign',
    'techcrunch',
    'the-new-york-times',
    'the-wall-street-journal',
	'the-washington-post',
]

redis_client = redis.StrictRedis(REDIS_HOST, REDIS_PORT)
cloudAMQP_client = CloudAMQPClient(SCRAPE_NEWS_TASK_QUEUE_URL, SCRAPE_NEWS_TASK_QUEUE_NAME)



while True:
	news_list = news_api_client.getNewsFromSource(NEWS_SOURCES)
	num_of_new_news = 0

	for news in news_list:
		news_digest = hashlib.md5(news['title'].encode('utf-8')).digest().encode('base64')

		if redis_client.get(news_digest) is None:
			num_of_new_news = num_of_new_news + 1
			news['digest'] = news_digest

			# If 'publishedAt' is None, set it to current UTC time
			if news['publishedAt'] is None:
				# Make the time in format YYYY-MM-DDTHH:MM:SS in UTC
				news['publishedAt'] = datetime.datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')

			redis_client.set(news_digest, news)
			redis_client.expire(news_digest, NEWS_TIME_OUT_IN_SECONDS)

			cloudAMQP_client.sendMessage(news)

	print "Fetch %d news." % (num_of_new_news)

	cloudAMQP_client.sleep(SLEEP_TIME_IN_SECONDS)
