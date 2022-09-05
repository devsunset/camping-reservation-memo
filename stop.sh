kill -9 $(ps aux | grep 'yarn' | awk '{print $2}')
kill -9 $(ps aux | grep 'esm' | awk '{print $2}')
echo "camping-reservation-memo stop..."