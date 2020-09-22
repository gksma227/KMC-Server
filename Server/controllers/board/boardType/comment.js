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
                res.sendStatus(200);
            } else {
                res.sendStatus(404);
            }
        })
        .catch((err) => {
            res.sendStatus(500);
            console.log(err);
        });
    },
    get: (req, res) => {
        console.log(req.query);
        console.log('test');
        res.sendStatus(200);
    },
    patch: (req, res) => {
        console.log(req.params);
        res.sendStatus(200);
    },
    delete: (req, res) => {
        console.log(req.params);
        res.sendStatus(200);
    },
};
