import { RowDataPacket } from 'mysql2';
import database from '../app/database';

class RoleService {
  async create(name: string, intro: string) {
    const statement = `
      INSERT INTO role (name, intro) VALUES (?, ?)
    `;

    const [result] = await database.execute(statement, [name, intro]);
    return result;
  }

  async insertRoleMenuMapping(roleId: number, menuId: number) {
    const statement = `
      INSERT INTO role_menu (role_id, menu_id) VALUES (?, ?)
    `;
    const [result] = await database.execute(statement, [roleId, menuId]);
    return result;
  }

  async update(roleId: number, name: string, intro: string) {
    const statement = `
      UPDATE role SET name = ?, intro = ? WHERE id = ?
    `;

    const [result] = await database.execute(statement, [name, intro, roleId]);
    return result;
  }

  async deleteRoleMenuMappingByRoleId(roleId: number) {
    const statement = `
      DELETE
      FROM role_menu
      WHERE role_id = ?;
    `;

    const [result] = await database.execute(statement, [roleId]);
    return result;
  }

  async delete(roleId: number) {
    const statement = `
      DELETE FROM role WHERE id = ?
    `;

    const [result] = await database.execute(statement, [roleId]);
    return result;
  }

  async getRoleCount(where: string, values: any[]) {
    const statement = `
      SELECT count(1) count FROM role ${where}
    `;

    const [result] = await database.execute(statement, values);
    return (result as RowDataPacket[])[0].count;
  }

  async getRoleList(where: string, values: any[]) {
    const statement = `
      SELECT r.*, IF(SUM(rm.role_id = r.id), JSON_ARRAYAGG(JSON_OBJECT('id', m.id, 'name', m.name, 'level', m.level, 'url', m.url, 'sort', m.sort, 'icon', m.icon, 'parent_id', m.parent_id, 'type', m.type, 'permission', m.permission, 'createAt', m.createAt, 'updateAt', m.updateAt)), JSON_ARRAY()) menuList
      FROM role r
      LEFT JOIN role_menu rm ON rm.role_id = r.id
      LEFT JOIN menu m ON m.id = rm.menu_id
      ${where}
      GROUP BY r.id
      LIMIT ?, ?
    `;

    const [result] = await database.execute(statement, values);
    return result as RowDataPacket[];
  }

  async checkRolePermissin(roleId: number, permission: string) {
    const statement = `
      SELECT *
      FROM menu m
      INNER JOIN role_menu rm ON rm.menu_id = m.id
      WHERE rm.role_id = ? AND m.permission = ?
      LIMIT 0, 1
    `;

    const [result] = await database.execute(statement, [roleId, permission]);
    return (result as RowDataPacket[]).length > 0;
  }
}

export default new RoleService();
