require('dotenv').config();

const APP_PORT: number = Number(process.env.APP_PORT || 3000);
const SALT_ROUNDS: number = Number(process.env.SALT_ROUNDS || 25);

exports.APP_PORT = APP_PORT
exports.SALT_ROUNDS = SALT_ROUNDS
