const db = require('../../../models');

const { board } = db;

module.exports = {
    get: (req, res) => {
        if (req.params.id){
            board
            .findAll({
                where: {
                    id: req.params.id
                },
            })
            .then((result)=> {
                if(result) {
                    res.sendStatus(200)
                } else {
                    res.sendStatus(409)
                }
            })
            .catch((err) => {
                res.status(500)
                console.log(err)
            })
        }
    },
    write: require('./write'),
    id: require('./id'),
    modify: require('./modify'),
};
