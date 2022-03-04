import path from "path";
import * as dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../../.env.sample") });

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;
// const url = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;

const url = `mongodb+srv://superuser:E7VbWRh1JmWMeqOR@clusterbirra.q0mxq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

export { url };

// mongodb://127.0.0.1:27017/
