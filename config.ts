require('dotenv').config();

const APP_PORT: number = Number(process.env.APP_PORT || 3015);
const SALT_ROUNDS: number = Number(process.env.SALT_ROUNDS || 10);
const JWT_SECRET: string = process.env.SALT_ROUNDS || 'sct';

exports.APP_PORT = APP_PORT
exports.SALT_ROUNDS = SALT_ROUNDS
exports.JWT_SECRET = JWT_SECRET