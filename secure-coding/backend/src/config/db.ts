export const BCRYPT_WORK_FACTOR = 12

export const BCRYPT_MAX_BYTES = 72

const {
  DB_USER,
  DB_PASSWORD = "",
  DB_HOST,
  DB_PORT,
  DB_NAME
} = process.env;

export const MONGO_URI = `mongodb://${DB_USER}:${encodeURIComponent(
  DB_PASSWORD
)}@${DB_HOST}:${DB_PORT}/${DB_NAME}?retryWrites=true&w=majority`;