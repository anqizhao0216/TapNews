# -*- coding: utf-8 -*

import os
import sys
from newspaper import Article

# Import common package in parent directory
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))
sys.path.append(os.path.join(os.path.dirname(__file__), 'scrapers'))

import cnn_news_scraper
from CloudAMQP_client import CloudAMQPClient

SLEEP_TIME_IN_SECONDS = 5
SCRAPE_NEWS_TASK_QUEUE_URL = 'amqp://fnidwrfk:de_m9ba52iYJy0TW0-VMuaSY1QZZzsxX@otter.rmq.cloudamqp.com/fnidwrfk'
SCRAPE_NEWS_TASK_QUEUE_NAME = 'tap-news-scrape-news-task-queue'
DEDUPE_NEWS_TASK_QUEUE_URL = 'amqp://bqloyjhw:lJLTw5sh950i0orXukXGfNIBfUBn03ab@otter.rmq.cloudamqp.com/bqloyjhw'
DEDUPE_NEWS_TASK_QUEUE_NAME = 'tap-news-dedupe-news-task-queue'

scrape_news_queue_client = CloudAMQPClient(SCRAPE_NEWS_TASK_QUEUE_URL, SCRAPE_NEWS_TASK_QUEUE_NAME)
dedupe_news_queue_client = CloudAMQPClient(DEDUPE_NEWS_TASK_QUEUE_URL, DEDUPE_NEWS_TASK_QUEUE_NAME)

def handle_message(msg):
    if msg is None or not isinstance(msg, dict):
        print 'message is broken'
        return

    task = msg

    article = Article(task['url'])
    article.download()
    article.parse()

    task['text'] = article.text

    print article.text
    dedupe_news_queue_client.sendMessage(task)


while True:
	if scrape_news_queue_client is not None:
		msg = scrape_news_queue_client.getMessage()
		if msg is not None:
			# Parse and process the task
			try:
				handle_message(msg)
			except Exception as e:
				print e
				pass
		scrape_news_queue_client.sleep(SLEEP_TIME_IN_SECONDS)
