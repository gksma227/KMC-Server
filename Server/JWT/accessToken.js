// 자원 접근을 위한 access token 입니다.
const jwt = require('jsonwebtoken');

const secret = process.env.ACCESS_JWT;

exports.accessJwtSign = (id, email) => new Promise((resolve, reject) => {
        jwt.sign(
            {
                id,
                email,
            },
            secret,
            {
                expiresIn: '7d',
                issuer: 'ksai.kr',
                subject: 'access',
            }, (err, token) => {
                if (err) reject(err);
                resolve(token);
            },
        );
    });

exports.accessJwtVerify = (token) => new Promise(
        (resolve, reject) => {
            jwt.verify(token, secret, (err, decoded) => {
                if (err) reject(err);
                resolve(decoded);
            });
        },
    );
