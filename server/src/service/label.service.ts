import { RowDataPacket } from 'mysql2';
import database from '../app/database';

class LabelService {
  async create(name: string) {
    const statement = `
      INSERT INTO label (name) VALUES (?)
    `;

    const [result] = await database.execute(statement, [name]);

    return result;
  }

  async hasLabel(name: string) {
    const statement = `
      SELECT * FROM label WHERE label.name = ?
    `;

    const [result] = await database.execute(statement, [name]);

    return (result as RowDataPacket[]).length > 0;
  }

  async getLabelCount(where: string, values: any[]) {
    const statement = `
      SELECT count(1) count From label l ${where}
    `;

    const [result] = await database.execute(statement, values);
    return (result as RowDataPacket[])[0].count;
  }

  async getLabels(where: string, values: any[], offset: number, size: number) {
    const statement = `
      SELECT l.*, count(label_id) postCount
      FROM label l
      LEFT JOIN post_label pl ON pl.label_id = l.id
      ${where}
      GROUP BY l.id
      LIMIT ?, ?
    `;

    const [result] = await database.execute(statement, [...values, offset, size]);

    return result;
  }

  async delete(labelId: number) {
    const statement = `
      DELETE From label WHERE id = ?
    `;

    const [result] = await database.execute(statement, [labelId]);
    return result;
  }

  async update(labelId: number, name: string) {
    const statement = `
      UPDATE label SET name = ? WHERE id = ?
    `;

    const [result] = await database.execute(statement, [name, labelId]);
    return result;
  }
}

export default new LabelService();
