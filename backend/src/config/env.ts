import dotenv from "dotenv";

dotenv.config({quiet: true});

//we can also write uper code as=> " import "dotenv/config"
export const ENV = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    NODE_ENV: process.env.NODE_ENV,
}