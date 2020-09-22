module.exports = {
    get: (req, res) => {
        res.send(200);
    },
    comment: require('./comment'),
    write: require('./write'),
    id: require('./id'),
    modify: require('./modify'),
};
