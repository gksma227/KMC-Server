const db = require('../../models');

const { boardtype } = db;

module.exports = {
    boardType: require('./boardType'),
    get: (req, res) => {
      boardtype.findAll({
        attributes: ['id', 'typename'],
      }).then((result) => {
        const boardtypes = [];

        result.forEach((ele) => {
          const obj = {};
          obj.id = ele.id;
          obj.typename = ele.typename;
          boardtypes.push(obj);
        });

        console.log(boardtypes);

        res.send(boardtypes);
      });
    },
  };
