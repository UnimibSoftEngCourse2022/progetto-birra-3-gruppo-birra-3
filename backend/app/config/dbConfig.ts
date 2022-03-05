import path from "path";
import * as dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  REMOTE_DB_PASSWORD,
  REMOTE_DB_USER,
} = process.env;
const url = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;

// const url = `mongodb+srv://${REMOTE_DB_USER}:${REMOTE_DB_PASSWORD}@clusterbirra.q0mxq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

export { url };

// mongodb://127.0.0.1:27017/
