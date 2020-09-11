module.exports = {
    post: (req, res) => {
        console.log('check: ', req.params);
        res.send(201);
    },
};
