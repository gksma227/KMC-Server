module.exports = {
    get: (req, res) => {
        res.send(200);
    },
    write: require('./write'),
    id: require('./id'),
    modify: require('./modify'),
};
