import { RowDataPacket } from 'mysql2';
import database from '../app/database';

class FileService {
  async saveAvatarInfo(
    filepath: string,
    filename: string,
    mimetype: string,
    size: number,
    userId: number
  ) {
    const statement = `
      INSERT INTO avatar (filepath, filename, mimetype, size, user_id) VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await database.execute(statement, [
      filepath,
      filename,
      mimetype,
      size,
      userId
    ]);

    return result;
  }

  async getAvatarByUserId(userId: number) {
    const statement = `
      SELECT * FROM avatar WHERE user_id = ?
    `;

    const [result] = await database.execute(statement, [userId]);

    return result as RowDataPacket[];
  }

  async createFile(
    filepath: string,
    filename: string,
    mimetype: string,
    size: number,
    postId: number,
    userId: number
  ) {
    const statement = `
      INSERT INTO file (filepath, filename, mimetype, size, post_id, user_id) VALUES (?, ?, ?, ?, ?, ?);
    `;

    const [result] = await database.execute(statement, [
      filepath,
      filename,
      mimetype,
      size,
      postId,
      userId
    ]);

    return result;
  }

  async getFileByFilename(filename: string) {
    const statement = `
      SELECT * FROM file WHERE filename = ?;
    `;

    const [result] = await database.execute(statement, [filename]);

    return result as RowDataPacket[];
  }
}

export default new FileService();
