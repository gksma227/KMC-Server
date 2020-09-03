const db = require('../../models');
const { jwtSign } = require('../../JWT');
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
        .then ((result) => {
            if (!result) {
                res.status(404).json({ message: 'invalid user' });
            } else {
                jwtSign(result.id, result.nickname, 'user').then((token) => {
                    res.set('x-access-token', token);
                    res.status(201).json({
                        id: result.id,
                        nickname: result.nickname,
                    });
                });
            }
        })
        .catch((err)=>{
            res.status(500).send(err);
        });
    },
};
