cd backend_server/
python service.py &

cd ../web_server/client
npm run build &

cd ../web_server/server
npm start &

cd ../news_recommendation_service
python recommendation_service.py &
python click_log_processor.py &

echo "=================================================="
read -p "PRESS [ENTER] TO TERMINATE PROCESSES." PRESSKEY

kill $(jobs -p)
