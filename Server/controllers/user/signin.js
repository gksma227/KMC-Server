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
                    res.status(200).json({
                        email: result.email,
                        nickname: result.nickname,
                        position: 'user',
                    });
                });
            }
        })
        .catch((err)=>{
            res.status(404).send(err);
        });
    },
};
