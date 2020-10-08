const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Express 서버에서 발생하는 이벤트들을 기록해주는 미들웨어
const morgan = require('morgan');

const { refreshJwtVerify } = require('./JWT/refreshToken');
const { accessJwtSign } = require('./JWT/accessToken');
const db = require('./models');

const { user } = db;

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

// Print the request log on console
app.use(morgan('dev'));

app.use('/user', userRouter);
app.use('/board', boardRouter);

// refreshToken을 통해 accessToken을 발급합니다.
app.get('/auth', async (req, res) => {
  const token = req.get('x-refresh-token');

  if (!token) { // 'x-refresh-token'이 없으면
      return res.status(401).json({
          message: '헤더에 Refresh 토큰이 없습니다.',
      });
  }
  // 'x-refresh-token이 있으면'
  // DB에서 사용자가 맞은지 확인하고 accessToken을 발급한다.
  await refreshJwtVerify(token).then((payload) => {
    if (payload.id) {
      user
      .findOne({
        where: {
          id: payload.id,
        },
      })
      .then((result) => {
        // access token 발급
        accessJwtSign(result.id, result.email).then((accessToken) => {
          res.set('x-access-token', accessToken);
           // 응답코드 작성
          res.status(200).json({
            message: 'accessToken이 발급되었습니다',
          });
        });
      })
      .catch((err) => {
        res.status(401).json({
          message: '유저를 찾을 수 없습니다.',
        });
        console.log('err message: ', err);
      });
    }
  }).catch((err) => {
    if (err.name === 'TokenExpiredError') { // 유효기간이 초과한 에러일 경우
        return res.status(419).json({
            message: 'Refresh 토큰이 만료되었습니다',
        });
    }

         return res.status(401).json({
             message: '유효하지 않은 Refresh 토큰입니다.',
         });
  });
});

app.set('port', port);
app.listen(app.get('port'), () => {
  console.log(`app is listening in PORT ${app.get('port')}`);
});

// 나중 테스트 코드에서 쓰기 위해 export
module.exports = app;
