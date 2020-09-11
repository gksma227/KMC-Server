module.exports = {
    get: (req, res) => {
        console.log('check: ', req.params);
        res.send(200);
    },
};
