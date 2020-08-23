// require 는 해당 파일에 module.exports 혹은 export = oracledb 를 리턴
// exports는 

// oracledb 에 connection 은 export 되어 있지 않으므로 변수 형태로 지정 후 getConnection 함수를 이용하여 구현하자.
import { getConnection } from 'oracledb';
// web application framework 라고만 소개하고 있는데...
//import express, { json } from 'express';
import express, { json } from 'express';
// const 는 constractor 약자이다 생성자이다.
const app = express();
// 포트 설정
const _port = 5000;
// .env 에 정보를 가져올 수 있는 모듈이다. fs를 이용하여 파일 컨트롤을 할 필요가 없다.
// oracledb 에 경우 key : value 형태에 데이터이어야 편리하게 사용할 수 있으므로 json 형태로 가자
//require('dotenv').config();

// json
import { readFileSync } from 'fs';
const dbinfo = JSON.parse(readFileSync('./oracledb.json'));

console.log(dbinfo.database_info);

// app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// env 파일 지정
// dotenv.config({ path: path.join(__dirname, 'path/to/.env') })


// // 진짜로 가저오는지 확인 해보자
// console.log(process.env.NODE_ENV);
// console.log(process.env.DB_HOST);
// console.log(process.env.DB_PORT);
// console.log(process.env.DB_NAME);
// // 이렇게 중괄호 안에다가 쓸 때 혹은 펑션안에다 쓸 때는 ' 이게 아닌 ` 이거다
// console.log(`${process.env.DB_NAME}`);

app.use(json());
// router 연결
import indexRouter from './routers';

// 1 번 파람 접속정보 user : "" , password : "", connectString : "" 
// 2번 파람 콜백 .then -> success .catch -> fail
getConnection(dbinfo.database_info)
    .then(()=>console.info('DB server connect'))
    .catch(e => console.info('DB error', e));

app.use('/', indexRouter);

app.listen(_port, () => console.log(`app listen ${_port} port`) );

