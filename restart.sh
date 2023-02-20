#!/bin/bash
docker stop mongo && docker start mongo
kill -9 $(ps aux | grep 'esm' | awk '{print $2}')
echo "schedule-memo stop..."
cd /workspace/app/schedule-memo/backend && /home/ubuntu/.nvm/versions/node/v16.19.0/bin/node -r esm src > /workspace/app/schedule-memo/app.log &
echo "schedule-memo start..."
