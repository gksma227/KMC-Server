const db = require('../../../models');
const { board } = db;
const { user } = db;
module.exports = {
    get: (req, res) => {
        // console.log('check: ', req.params);
        // res.send(200);
        if (req.params.id){
            board
            .findOne({
                include: [
                    {
                        model: user,
                    }
                ],
                where: {
                    id: req.params.id
                }
            })
            .then((result)=>{
                if (result){
                    res.sendStatus(200)
                } else {
                    res.sendStatus(409)
                }
            })
            .catch((err) => {
                res.sendStatus(500)
                console.log(err)
            })
        }
    },
};
