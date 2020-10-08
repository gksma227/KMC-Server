const db = require('../../models');

const { user } = db;
const { accessJwtVerify } = require('../../JWT/accessToken');

module.exports = {
    get: (req, res) => {
        const token = req.get('x-access-token');

        if (!token) { // 'x-access-token'이 없으면
            return res.status(401).json({
                status: 401,
                message: '헤더에 토큰이 없습니다.',
            });
        }

        accessJwtVerify(token).then((payload) => {
            if (payload.id) {
                user
                .findOne({
                    where: {
                        id: payload.id,
                    },
                })
                .then((result) => {
                    console.log(result);
                    if (result) {
                        const sendObj = {
                            id: result.id,
                            nickname: result.nickname,
                        };
                    res.status(201).json(sendObj);
                    } else {
                        res.sendStatus(409);
                    }
                })
                .catch((err) => {
                    res.sendStatus(500).json({
                        code: 500,
                        message: err.name,
                    });
                });
            }
    }).catch((err) => {
        if (err.name === 'TokenExpiredError') { // 유효기간이 초과한 에러일 경우
            return res.status(419).json({
                code: 419,
                message: '토큰이 만료되었습니다',
            });
        }

             return res.status(401).json({
                 code: 401,
                 message: '유효하지 않은 토큰입니다.',
             });
    });
},
        patch: (req, res) => {
            const token = req.get('x-access-token');
            const {
                nickname, password,
            } = req.body;

            if (!token) { // 'x-access-token'이 없으면
                return res.status(401).json({
                    status: 401,
                    message: '헤더에 토큰이 없습니다.',
                });
            }

            accessJwtVerify(token).then((payload) => {
                if (payload.id) {
                    user
                    .findOne({
                        where: {
                            id: payload.id,
                        },
                    })
                    .then((result) => {
                        console.log(result);
                        if (result) {
                            user.update({
                                nickname,
                                password,
                            }, { where: { id: payload.id } });
                            const sendObj = {
                                id: result.id,
                                nickname: result.nickname,
                            };
                        res.status(201).json(sendObj);
                        } else {
                            res.sendStatus(409);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        res.sendStatus(500);
                    });
                }
        }).catch((err) => {
            if (err.name === 'TokenExpiredError') { // 유효기간이 초과한 에러일 경우
                return res.status(419).json({
                    code: 419,
                    message: '토큰이 만료되었습니다',
                });
            }

             return res.status(401).json({
                 code: 401,
                 message: '유효하지 않은 토큰입니다.',
             });
        });
    },
};
