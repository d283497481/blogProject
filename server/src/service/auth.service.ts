import { RowDataPacket } from 'mysql2';
import database from '../app/database';

class AuthService {
  async checkResource(tabName: string, id: number, userId: number) {
    const statement = `
      SELECT * FROM ${tabName} WHERE id = ? AND user_id = ?
    `;

    const [result] = await database.execute(statement, [id, userId]);

    return (result as RowDataPacket[]).length > 0;
  }
}

export default new AuthService();
