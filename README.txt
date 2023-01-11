# schedule-memo

schedule-memo

---------------------------------------------------------

#install & service start

1. mongodb 설치
  $ docker run -d -p 27017:27017 --name mongo -v /workspace/app/mongo/db:/data/db  mongo --auth  
  $ docker exec -it mongo /bin/bash	
	mongosh
	use admin
	db.createUser(
	 {
	 user: "devsunset",
	 pwd: "PASSWORD",
	 roles: [ { role: "root", db: "admin" } ]
	 })

2.  backend/.env 파일에 아래 내용 작성 하여 생성
PORT=4000
MONGO_URI=mongodb://접속정보설정
JWT_SECRET= (# openssl rand -hex 64   명령어로 key 생성)

3. frontend 설치 및 빌드
   cd frontened
   yarn install
   yarn build

4. backend 설치 및 빌드 
   cd backend
   yarn install

