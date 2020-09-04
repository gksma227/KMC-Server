const db = require('../../models')

const { user } = db;
const { jwtVerify } = require('../../JWT');

module.exports = {
    get: (req, res) => {
        const token = req.get('x-access-token');
        if (token){
             jwtVerify(token).then((payload) => {
        if (payload.id) {
            user
            .findOne({
                where: {
                    id: payload.id,
                },
            })
            .then((result) => {
                console.log(result);
                if (result) {
                    const sendObj = {
                        id: result.id,
                        nickname: result.nickname,
                    }
                   res.status(201).json(sendObj);
                } else {
                    res.sendStatus(409);
                }
            })
            .catch((err) => {
                console.log(err)
                res.sendStatus(500);
            });
        }
    }).catch(err => {
        console.log(`jwtVerify error: ${err}`);

    })

 }
},
        patch: (req, res) => {
            const token = req.get('x-access-token');
            const { 
                nickname, password
            } = req.body;
            if (token){
                 jwtVerify(token).then((payload) => {
            if (payload.id) {
                user
                .findOne({
                    where: {
                        id: payload.id,
                    },
                })
                .then((result) => {
                    console.log(result);
                    if (result) {
                        user.update({
                            nickname,
                            password,
                        }, { where: { id: payload.id } })
                        const sendObj = {
                            id: result.id,
                            nickname: result.nickname,
                        }
                       res.status(201).json(sendObj);
                    } else {
                        res.sendStatus(409);
                    }
                })
                .catch((err) => {
                    console.log(err)
                    res.sendStatus(500);
                });
            }
        }).catch(err => {
            console.log(`jwtVerify error: ${err}`);
    
        })
    
     }
    }
}
