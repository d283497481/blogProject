import { RowDataPacket } from 'mysql2';
import database from '../app/database';
import { IPost } from './../constants/post-types';

class PostService {
  async create(post: IPost) {
    const statement = `
      INSERT INTO post (title, abstract, content, user_id) VALUES (?, ?, ?, ?)
    `;
    const [result] = await database.execute(statement, [
      post.title,
      post.abstract,
      post.content,
      post.userId
    ]);

    return result;
  }

  async getPostById(postId: number) {
    try {
      const statement = `
        SELECT
          p.id, p.title, p.abstract, p.content, p.createAt, p.updateAt,
          JSON_OBJECT('id', u.id, 'name', u.name, 'nickname', u.nickname, 'avatarUrl', u.avatar_url) user,
          (SELECT filename FROM file WHERE file.post_id = p.id ORDER BY file.createAt desc limit 0, 1) image
        FROM post p
        LEFT JOIN user u ON u.id = p.user_id
        WHERE p.id = ?
      `;
      const [result] = await database.execute(statement, [postId]);
      return (result as RowDataPacket[])[0];
    } catch (error) {
      console.log(error);
    }
  }

  async getLabels(postId: number) {
    const statement = `
      SELECT l.id, l.name
      FROM post_label pl
      LEFT join label l ON l.id = pl.label_id
      WHERE pl.post_id = ?
    `;

    const [result] = await database.execute(statement, [postId]);

    return result;
  }

  async getPostCount(join: string, where: string, values: any[]) {
    const statement = `
      SELECT count(1) count
      FROM post p
      ${join}
      ${where}
    `;

    const [result] = await database.execute(statement, values);
    return (result as RowDataPacket[])[0].count;
  }

  async getPostList(join: string, where: string, values: any[], offset: number, size: number) {
    const statement = `
      SELECT
        p.id, p.title, p.abstract, p.createAt, p.updateAt,
        JSON_OBJECT('id', u.id, 'name', u.name, 'nickname', u.nickname) user,
        (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', l.id, 'name', l.name)) FROM post_label pl LEFT JOIN label l ON pl.label_id = l.id WHERE p.id = pl.post_id) labels,
        COUNT(c.post_id) commentCount,
        (SELECT file.filename FROM file WHERE file.post_id = p.id ORDER BY file.createAt desc limit 0, 1) image
      FROM post p
      LEFT JOIN user u ON u.id = p.user_id
      LEFT JOIN comment c ON c.post_id = p.id
      ${join}
      ${where}
      GROUP BY p.id
      ORDER BY p.updateAt DESC
      LIMIT ?, ?
    `;

    const [result] = await database.execute(statement, [...values, offset, size]);
    return result as RowDataPacket[];
  }

  async update(postId: number, title: string, abstract: string, content: string) {
    const statement = `
      UPDATE post SET title = ?, abstract = ?, content = ? WHERE id = ?
    `;

    const [result] = await database.execute(statement, [title, abstract, content, postId]);

    return result;
  }

  async remove(postId: number) {
    const statement = `
      DELETE FROM post WHERE id = ?
    `;

    const [result] = await database.execute(statement, [postId]);

    return result;
  }

  async addLabel(postId: number, labelId: number) {
    const statement = `
      INSERT INTO post_label (post_id, label_id) VALUES (?, ?)
    `;

    const [result] = await database.execute(statement, [postId, labelId]);
    return result;
  }

  async deleteLabel(postId: number) {
    const statement = `
      DELETE FROM post_label WHERE post_id = ?
    `;

    const [result] = await database.execute(statement, [postId]);
    return result;
  }

  async hasLabel(postId: number, labelId: number) {
    const statement = `
      SELECT * FROM post_label WHERE post_id = ? AND label_id = ?
    `;

    const [result] = await database.execute(statement, [postId, labelId]);

    return (result as RowDataPacket[]).length > 0;
  }
}

export default new PostService();
