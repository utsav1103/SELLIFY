import {drizzle} from "drizzle-orm/node-postgres";
import {Pool} from "pg";
import {ENV} from "../config/env";
import * as schema from "./schema";

if(!ENV.DATABASE_URL){
    throw new Error("DATABASE_URL is not defined in environment variables");
}


//initialize  postgres connection pool

const pool = new Pool({
    connectionString:ENV.DATABASE_URL,
});

//log when first connectio is made
pool.on("connect", ()=> {
    console.log("Connected to Postgres database successfully");
});

pool.on("error", (error) => {
    console.error("Error in Postgres pool:", error);
});

export const db = drizzle({client:pool,schema});