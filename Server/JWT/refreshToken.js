// 로그인 세션 유지를 위한 refresh token 입니다.
const jwt = require('jsonwebtoken');

const secret = process.env.REFRESH_JWT;

exports.refreshJwtSign = (id, username) => new Promise((resolve, reject) => {
        jwt.sign(
            {
                id,
                username,
            },
            secret,
            {
                expiresIn: '3d',
                issuer: 'ksai.kr',
                subject: 'refresh',
            }, (err, token) => {
                if (err) reject(err);
                resolve(token);
            },
        );
    });

exports.refreshJwtVerify = (token) => new Promise(
        (resolve, reject) => {
            jwt.verify(token, secret, (err, decoded) => {
                if (err) reject(err);
                resolve(decoded);
            });
        },
    );
