# mydiscordbot
- aka. 갱찌두뇌봇

# 구동환경
- 서버 https://portal.daki.cc/
- 디스코드 개발자 포털 https://discord.com/developers/applications
- Node.js / Discord.js v14 / API 통신 / 아래 모듈
  - axios
  - cheerio
  - node-schedule
  - request

# 배포 방법
## 1. 디스코드 개발자 포털 작업
### 1-1. 어플리케이션 추가
![image](https://user-images.githubusercontent.com/97089773/215365852-c906e972-bde7-4145-a821-65b58003aaef.png)

### 1-2. config.json
clientId = General Infomation - APPLICATION ID

token = BOT - resetToken (생성시 확인 가능 / 재확인 불가능 / 리셋으로 변경하며 확인가능)

guildIds = 배열 형태로 저장 / 디스코드 서버 아이콘 우클릭 시 확인 가능

![image](https://user-images.githubusercontent.com/97089773/215365698-03cdc9d3-7433-48df-9524-57b8f9217827.png)

## 2. 서버 생성 및 시작
### 2-1. daki.cc 가입 및 서버 생성
### 2-2. 소스코드 업로드
![image](https://user-images.githubusercontent.com/97089773/215365974-d40a66ef-b3b9-4178-bc5c-a9252358af70.png)
### 2-3. 서버 시작
![image](https://user-images.githubusercontent.com/97089773/215366131-22ce0ef5-03cf-49ec-8aab-057343e7a508.png)

- Startup 탭에서 최초 1회만 아래 명령어로 설
  - STARTUP COMMAND 1 : npm install
  - STARTUP COMMAND 2 : deploy.js
  
- Console 탭에서 Start

## 3. 일부 기능 설명
### (추후 작성)
