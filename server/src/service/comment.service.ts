import { RowDataPacket } from 'mysql2';
import database from '../app/database';

class CommentService {
  async create(content: string, postId: number, userId: number) {
    const statement = `
      INSERT INTO comment (content, post_id, user_id) VALUES (?, ?, ?);
    `;

    const [result] = await database.execute(statement, [content, postId, userId]);

    return result;
  }

  async getCommentByPostId(postId: number, offset: number = 0, size: number = 50) {
    const statement = `
      SELECT
        c.id, c.content, c.comment_id commentId, c.createAt, c.updateAt,
        JSON_OBJECT('id', u.id, 'name', u.name, 'nickname', u.nickname, 'avatarUrl', u.avatar_url) user
      FROM comment c
      LEFT JOIN user u ON u.id = c.user_id
      WHERE c.post_id = ?
      ORDER BY c.createAt DESC
      LIMIT ?, ?
    `;
    const [result] = await database.execute(statement, [postId, offset, size]);
    return result as RowDataPacket[];
  }

  async reply(content: string, postId: number, userId: number, commentId: number) {
    const statement = `
      INSERT INTO comment (content, post_id, user_id, comment_id) VALUES (?, ?, ?, ?);
    `;

    const [result] = await database.execute(statement, [content, postId, userId, commentId]);

    return result;
  }

  async update(content: string, commentId: number) {
    const statement = `
      UPDATE comment SET content = ? WHERE id = ?
    `;

    const [result] = await database.execute(statement, [content, commentId]);

    return result;
  }

  async remove(commentId: number) {
    const statement = `
      DELETE FROM comment WHERE id = ?
    `;

    const [result] = await database.execute(statement, [commentId]);

    return result;
  }

  async getCommentCountByPostId(postId: number) {
    const statement = `
      SELECT count(1) count
      FROM comment
      WHERE comment.post_id = ?
    `;

    const [result] = await database.execute(statement, [postId]);
    return (result as RowDataPacket[])[0].count;
  }
}

export default new CommentService();
