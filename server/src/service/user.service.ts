import database from '../app/database';
import { RowDataPacket } from 'mysql2';

class UserService {
  async create(insertField: any[], insertVals: any[]) {
    try {
      const statement = `
        INSERT INTO user (${insertField.join(', ')})
        VALUES (${insertField.map((item) => '?').join(', ')})
      `;
      await database.execute(statement, insertVals);
    } catch (error) {
      console.log(error);
    }
  }
  async getUserByName(name: string) {
    const statement = `
      SELECT *
      FROM user
      WHERE name = ?
      LIMIT 0, 1
    `;
    const [result] = await database.execute(statement, [name]);
    return result as RowDataPacket[];
  }

  async getUserById(userId: number) {
    const statement = `
      SELECT *
      FROM user
      WHERE id = ?
      LIMIT 0, 1
    `;

    const [result] = await database.execute(statement, [userId]);
    return result as RowDataPacket[];
  }

  async hasNickname(nickname: string) {
    const statement = `
      SELECT * FROM user WHERE nickname = ?
    `;

    const [result] = await database.execute(statement, [nickname]);
    return (result as RowDataPacket[]).length > 0;
  }

  async updateAvatarUrlByUserId(avatarUrl: string, userId: number) {
    const statement = `
      UPDATE user SET avatar_url = ? WHERE id = ?
    `;

    const [result] = await database.execute(statement, [avatarUrl, userId]);

    return result;
  }

  async getUserCount(where: string, values: any[]) {
    const statement = `
      SELECT count(1) count
      FROM user u
      ${where}
    `;

    const [result] = await database.execute(statement, values);
    return (result as RowDataPacket[])[0].count;
  }

  async getUserList(where: string, values: any[], offset: number, size: number) {
    const statement = `
      SELECT u.*, r.name roleName
      FROM user u
      LEFT JOIN role r ON r.id = u.role_id
      ${where}
      LiMIT ?, ?
    `;

    const [result] = await database.execute(statement, [...values, offset, size]);
    return result as RowDataPacket[];
  }

  async getUserInfoById(userId: number) {
    const statement = `
      SELECT
        u.id, u.name, u.avatar_url, u.nickname, u.createAt, u.updateAt,
        IF(u.role_id is null, null, JSON_OBJECT('id', r.id, 'name', r.name, 'intro', r.intro, 'createTime', r.createAt, 'updateTime', r.updateAt)) role
      FROM user u
      LEFT JOIN role r ON r.id = u.role_id
      WHERE u.id = ?
      LIMIT 0, 1
    `;

    const [result] = await database.execute(statement, [userId]);
    return (result as RowDataPacket[])[0];
  }

  async update(userId: number, updateField: any[], updateVals: any[]) {
    const statement = `
      UPDATE user
      SET ${updateField.map((item) => `${item} = ?`).join(', ')}
      WHERE id = ?
    `;

    const [result] = await database.execute(statement, [...updateVals, userId]);
    return result;
  }

  async delete(userId: number) {
    const statement = `
      DELETE FROM user WHERE id = ?
    `;

    const [result] = await database.execute(statement, [userId]);
    return result;
  }

  async updateStatus(userId: number, status: number) {
    const statement = `
      update user set status = ? WHERE id = ?
    `;

    const [result] = await database.execute(statement, [status, userId]);
    return result;
  }

  async updatePassword(userId: number, password: number) {
    const statement = `
      UPDATE user SET password = ? WHERE id = ?
    `;

    const [result] = await database.execute(statement, [password, userId]);
    return result;
  }
}

export default new UserService();
