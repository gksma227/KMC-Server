const db = require('../../models');
const { user } = db;
module.exports = {
    post: (req, res) => {
        const { 
            email, nickname, password,
        } = req.body;
        user
        .findOrCreate({
            where: {
                email
            },
            defaults: {
                nickname,
                password
            },
        })
        .then(async ([result, created]) => {
            if (!created) {
                return res.sendStatus(409);
            }
            const data = await result.get({ plain: true });
            console.log('user SignupData: ', data);
            res.status(201).end('ok!');
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
    },
};