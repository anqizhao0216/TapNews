from CloudAMQP_client import CloudAMQPClient

CLOUDAMQP_URL = 'amqp://uxoncucv:BgaicCzeIkH4sdQx0rS5U-8qF_PXKDn_@otter.rmq.cloudamqp.com/uxoncucv'
QUEUE_NAME = 'test'

def test_basic():
	client = CloudAMQPClient(CLOUDAMQP_URL, QUEUE_NAME)

	sentMsg = {'test_key': 'test_value'}
	client.sendMessage(sentMsg)
	client.sleep(5)
	receivedMsg = client.getMessage()
	assert sentMsg == receivedMsg
	print "test_basic passed!"

if __name__ == '__main__':
	test_basic()
