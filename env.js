import dotenv from 'dotenv';
import { cleanEnv, port, str } from 'envalid';

dotenv.config();

const env = cleanEnv(process.env, {
    PORT : port({ default : 8000 }),
    MONGO_CONNECTION_STRING : str(),
    ADMIN_EMAIL : str(),
    ADMIN_PASS : str(),
    ADMIN_JWT_SECRET_KEY : str(),
    JWT_EXPIRES : str()
})



export default env