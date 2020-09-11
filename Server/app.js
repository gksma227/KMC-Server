const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Express 서버에서 발생하는 이벤트들을 기록해주는 미들웨어
const morgan = require('morgan');

const app = express();
const port = 3001;

// const { jwtVerify } = require('./JWT');
// routes
const userRouter = require('./routes/user');
const boardRouter = require('./routes/board');

/*
 * bodyparser.json() - body로 넘어온 데이터를 JSON 객체로 변환
 */
app.use(bodyParser.json());
/*
 * bodyParser.urlencoded({ extended }) - 중첩 객체를 허용할지 말지를 결정하는 옵션
 * 참고 링크(https://stackoverflow.com/questions/29960764/what-does-extended-mean-in-express-4-0/45690436#45690436)
 */
app.use(bodyParser.urlencoded({ extended: false }));
/*
 * cors() - CORS를 대응하기 위한 라이브러리 ( Access-Control-Allow-Origin: * )
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
 */
app.use(
  cors({
    // origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PATCH'],
    credentials: true,
  }),
);

// set the secret key variable for jwt
app.set('jwt-secret', 'KMC@'); // secret 키의 값을 셋팅해준다. 추후에 데이터베이스에 저장된 데이터를 가져올 예정
// req.app.get('jwt-secret'); 값을 가져오는 함수
// print the request log on console
app.use(morgan('dev'));

// app.post('/test', (req, res) => {
//   // header에 저장되어 있는 x-access-token의 값을 가져옵니다.
//   const token = req.get('x-access-token');
//   jwtVerify(token).then((result) => {
//     console.log(result.id);
//     res.send(result);
//   });
//   // res.send('this res is ok!');
//   });

app.use('/user', userRouter);
app.use('/board', boardRouter);

app.set('port', port);
app.listen(app.get('port'), () => {
  console.log(`app is listening in PORT ${app.get('port')}`);
});

// 나중 테스트 코드에서 쓰기 위해 export
module.exports = app;
