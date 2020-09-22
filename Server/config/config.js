module.exports = {
 test: { // 서버 데이터베이스 정보
  username: 'code20',
  password: process.env.DATABASE_PASSWORD,
  database: 'KMC',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  dialect: 'mysql',
  logging: false,
  },
  development: { // 테스트할 때 DATABASE 연결 정보
    username: 'root',
    password: process.env.DATABASE_PASSWORD,
    database: 'KMC',
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    logging: false,
    },
};
