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
ex) mongodb://devsunset:PASSWORD@127.0.0.1:27017
JWT_SECRET=5245108391ef46ec733eab5200ad3975d3e1005ab29ae0e17896a2d1aaa55cd593b08ffa0f52012cdf0695c2ef8c3fc5c3e2df57c9c2d81f211bfb1120b796df
ex) $ openssl rand -hex 64 <- 명령어 수행 하여 난수 값 생성되는 값을 사용 

3. frontend 설치 및 빌드
   cd frontened
   yarn install
   yarn build

4. backend 설치 및 빌드 
   cd backend
   yarn install

