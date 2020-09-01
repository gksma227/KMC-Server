module.exports = {
 development: { // 로컬에서 테스트 할 때 DATABASE 연결 정보
  username: 'root',
  password: process.env.DATABASE_PASSWORD,
  database: 'KMC',
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  logging: false,
  },
  test: { // 테스트할 때 DATABASE 연결 정보
    username: 'root',
    password: process.env.DATABASE_PASSWORD,
    database: 'KMC',
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    logging: false,
    },
};
