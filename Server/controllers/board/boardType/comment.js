const db = require('../../../models');

const { comment, user } = db;

module.exports = {
    post: (req, res) => {
        const {
 c_userid, c_contents, c_recommend, c_boardid,
} = req.body;
        comment
        .findAll({
            where: {
                c_userid, c_contents, c_recommend, c_boardid,
            },
            include: [
                {
                    model: user,
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
};
