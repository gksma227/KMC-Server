const db = require('../../../models');

const { board } = db;

module.exports = {
    post: (req, res) => {
        // console.log('check: ', req.params);
        // res.send(201);
        const post = new board({
            title: req.body.title,
            userid: req.body.userid,
            contents: req.body.contents,
            register_date: new Date(),
            views: req.body.views,
            recommend: req.body.recommend,
            boardtype_id: req.body.boardtype_id,
        });
        post.save()
        .then((result) => {
           // console.log(result.dataValues);
            if (result) {
               res.sendStatus(201);
            } else {
                res.sendStatus(409);
            }
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
    },
};
