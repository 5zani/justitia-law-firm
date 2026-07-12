import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import "dotenv/config";

const NEW_USERNAME = "Admin";
const NEW_PASSWORD = "Justitia@2026Secure";

const conn = await mysql.createConnection(process.env.DATABASE_URL);
const hash = await bcrypt.hash(NEW_PASSWORD, 12);

const [result] = await conn.execute(
  "UPDATE users SET username = ?, passwordHash = ? WHERE username = ?",
  [NEW_USERNAME, hash, "justitia_admin"]
);

console.log("Rows affected:", result.affectedRows);
console.log("Admin credentials updated successfully.");
await conn.end();
