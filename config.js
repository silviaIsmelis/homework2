import { config } from "dotenv";
config();

export const SECRET = "yoursecretkey";

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admintea@localhost";
export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admintea";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin";