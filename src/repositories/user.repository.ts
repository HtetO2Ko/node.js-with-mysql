import type { ResultSetHeader } from "mysql2";
import pool from "../configs/db.js";
import type { IUser } from "../interfaces/user.interface.js";

export class UserRepository {
  async createUser(user: IUser): Promise<boolean> {
    const query = `
    INSERT INTO users 
    (userid, user_name, display_name, password, role, start_date, end_date, status) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

    const values = [
      user.userid ?? null,
      user.user_name ?? null,
      user.display_name ?? null,
      user.password ?? null,
      user.role ?? null,
      user.start_date ?? null,
      user.end_date ?? null,
      user.status ?? null,
    ];

    const [result] = await pool.execute<ResultSetHeader>(query, values);
    return result.affectedRows > 0;
  }

  async findByUsername(userName: string): Promise<IUser | null | undefined> {
    const [rows] = await pool.execute(
      "SELECT * FROM users WHERE user_name = ?",
      [userName],
    );
    const users = rows as IUser[];
    return users[0];
  }
}
