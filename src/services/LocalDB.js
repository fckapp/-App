// import mysql from 'mysql2/promise'; // mysql2 패키지 사용
// import {DB_HOST, DB_USER, DB_PASSWORD, DB_NAME} from '@env';


// // MariaDB 연결
// const dbConfig = {
//     host: DB_HOST,
//     user: DB_USER,
//     password: DB_PASSWORD,
//     database: DB_NAME,
// };

// // 데이터베이스 연결 확인 디버그용 함수
// const testConnection = async () => {
//     try {
//         const connection = await mysql.createConnection(dbConfig);
//         console.log('데이터베이스에 연결되었습니다!');
//         await connection.end();
//     } catch (error) {
//         console.error('데이터베이스 연결 오류:', error);
//     }
// };
// testConnection();

// // 소셜 회원가입자의 데이터 저장하는 로직
// export const snsSaveUser = async (user) => {
//     const connection = await mysql.createConnection(dbConfig);
//     await connection.execute(
//         'INSERT INTO users (user_social_id, created_at) VALUES (?, ?)',
//         [user.user_social_id, user.created_at]
//     );
//     await connection.end();
// };

// // 일반 회원가입자의 데이터 저장하는 로직
// export const generalSaveUser = async (user) => {
//     const connection = await mysql.createConnection(dbConfig);
//     await connection.execute(
//         'INSERT INTO users (user_email, user_pw_hash, created_at) VALUES (?, ?, ?)',
//         [user.user_email, user.user_pw_hash, user.created_at]
//     );
//     await connection.end();
// };

// export const findUserBySocialId = async (user_social_id) => {
//     const connection = await mysql.createConnection(dbConfig);
//     const [rows] = await connection.execute('SELECT * FROM users WHERE user_social_id = ?', [user_social_id]);
//     await connection.end();
//     return rows;
// };
