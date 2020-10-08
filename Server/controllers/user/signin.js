const db = require('../../models');
const { refreshJwtSign } = require('../../JWT/refreshToken');
const { accessJwtSign } = require('../../JWT/accessToken');

const { user } = db;

module.exports = {
    post: (req, res) => {
        const { email, password } = req.body;

        user
        .findOne({
            where: {
                email,
                password,
            },
        })
        .then(async (result) => {
            if (!result) {
                res.status(404).json({ message: 'invalid user' });
            } else {
                await refreshJwtSign(result.id, result.username).then((token) => {
                    res.set('x-refresh-token', token);
                });

                await accessJwtSign(result.id, result.email).then((token) => {
                    res.set('x-access-token', token);
                });

                res.status(200).json({
                    nickname: result.nickname,
                });
            }
        })
        .catch((err) => {
            res.status(500).send(err);
        });
    },
};
