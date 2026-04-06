import dotenv from 'dotenv';
import { cleanEnv, port, str } from 'envalid';

dotenv.config();

const env = cleanEnv(process.env, {
    PORT : port({ default : 8000 }),
    MONGO_CONNECTION_STRING : str()
})



export default env