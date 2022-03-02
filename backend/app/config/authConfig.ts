import path from "path";
import * as dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const { JWT_SECRET_KEY } = process.env;
export default { jwtSecret: <any>JWT_SECRET_KEY };