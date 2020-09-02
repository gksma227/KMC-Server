const jwt = require('jsonwebtoken');

const secret = process.env.JWT;

exports.jwtSign = (id, username, position) => new Promise((resolve, reject) => {
        jwt.sign(
            {
                id,
                username,
                position,
            },
            secret,
            {
                expiresIn: '7d',
                issuer: 'velopert.com',
                subject: 'userInfo',
            }, (err, token) => {
                if (err) reject(err);
                resolve(token);
            },
        );
    });

exports.jwtVerify = (token) => new Promise(
        (resolve, reject) => {
            jwt.verify(token, secret, (err, decoded) => {
                if (err) reject(err);
                resolve(decoded);
            });
        },
    );