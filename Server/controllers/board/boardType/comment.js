const db = require('../../../models');

const { comment, user, board } = db;

module.exports = {
    post: (req, res) => {
// eslint-disable-next-line new-cap
const post = new comment({
    c_userid: req.body.c_userid,
    c_contents: req.body.c_contents,
    c_recommend: req.body.c_recommend,
    c_date: new Date(),
    c_boardid: req.body.c_boardid,
});

post.save({
    include: [
        {
            models: user,
        },
        {
            models: board,
        },
],
})
        .then((result) => {
            if (result) {
                console.log('result: ', result);
                res.status(201).json({ id: result.id });
            } else {
                res.send(404);
            }
        })
        .catch((err) => {
            res.send(500);
            console.log(err);
        });
    },
    get: (req, res) => {
        if (req.params.id) {
            comment
            .findAll({
                include: [
                    {
                        model: user,
                    },
                    {
                        model: board,
                    },
                ],
                where: {
                    id: req.params.id,
                },
            })
            .then((result) => {
                if (result) {
                    res.sendStatus(200);
                } else {
                    res.sendStatus(409);
                }
            })
            .catch((err) => {
                res.sendStatus(500);
                console.log(err);
            });
        }
    },
    patch: (req, res) => {
        // eslint-disable-next-line new-cap
        const { c_contents } = req.body;
                comment.update({
                    c_contents,
                }, {
                    where: {
                        id: req.params.id,
                    },
                })
                .then((result) => {
                    console.log('result: ', result);
                    if (result[0]) {
                        // [0]이면 false, [1]이면 true
                        res.send(200);
                    } else {
                        res.send(409);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    res.send(500);
                });
    },
    delete: (req, res) => {
        comment
        .findOne({
            include: [
                {
                    model: user,
                },
                {
                    model: board,
                },
            ],
            where: {
                id: req.params.id,
            },
        })
        .then((result) => {
            if (result) {
                comment.delete().then(() => res.sendStatus(200));
            } else {
                res.sendStatus(409);
            }
        })
        .catch((err) => {
            res.sendStatus(500);
            console.log(err);
        });
    },
};
