import pgPromise from "pg-promise";
import pg from "pg-promise/typescript/pg-subset";
import dotenv from "dotenv";

dotenv.config();

const connection: pg.IConnectionParameters = {
  user: "clchrxovnlzkcd",
  password: process.env.HEROKU_PASSWORD,
  host: "ec2-44-194-113-156.compute-1.amazonaws.com",
  port: 5432,
  database: "d2212liro3fgf3",
  ssl: { rejectUnauthorized: false },
};

const pgp = pgPromise();
const db = pgp(connection);

export default db;
