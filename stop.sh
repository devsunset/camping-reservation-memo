kill -9 $(ps aux | grep 'camping-reservation-memo' | awk '{print $2}')
echo "camping-reservation-memo stop..."