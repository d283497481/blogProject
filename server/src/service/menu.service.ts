import { RowDataPacket } from 'mysql2';
import database from '../app/database';

class MenuService {
  async create(insertField: any[], instertVals: any[]) {
    const statement = `
      INSERT INTO menu (${insertField.join(', ')})
      VALUES (${insertField.map((item) => '?').join(', ')})
    `;

    await database.execute(statement, instertVals);
  }

  async getMenusByRoleId(roleId: number) {
    const statement = `
      SELECT m.*
      FROM menu m
      INNER JOIN role_menu rm ON rm.menu_id = m.id
      WHERE rm.role_id = ?
    `;

    const [result] = await database.execute(statement, [roleId]);
    return result as RowDataPacket[];
  }

  async update(menuId: number, updateField: any[], updateVals: any[]) {
    const statement = `
      UPDATE menu
      SET ${updateField.map((item) => `${item} = ?`).join(', ')}
      WHERE id = ?
    `;

    const [result] = await database.execute(statement, [...updateVals, menuId]);
    return result;
  }

  async delete(menuId: number) {
    const statement = `
      DELETE FROM menu WHERE id = ?
    `;

    const [result] = await database.execute(statement, [menuId]);
    return result;
  }

  async list() {
    const statement = `
      SELECT * FROM menu
    `;

    const [result] = await database.execute(statement);
    return result as RowDataPacket[];
  }
}

export default new MenuService();
