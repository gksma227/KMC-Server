const { refreshJwtSign } = require('./refreshToken');

let refreshtoken = '';

(async () => {
    await refreshJwtSign(1, 'hyejin').then((token) => {
        refreshtoken = token;
    });

    console.log(refreshtoken);
})();
