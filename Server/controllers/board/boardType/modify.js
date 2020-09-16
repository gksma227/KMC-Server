const db = require('../../../models')

const { board } = db;

module.exports = {
    patch: (req, res) => {
        const {
            title, contents, register_date
        } = req.body;
        board
        .findOne ({
            where : {
                id: req.params.id,
            },
        })
        .then((result) => {
            if (result) {
                board.update({
                    title, contents, register_date
                }).then(() => res.sendStatus(200))
            } else {
                res.sendStatus(409)
            }
        })
        .catch((err) => {
            res.sendStatus(500)
        })
    },
};
