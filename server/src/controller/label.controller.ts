import { Context, Next } from 'koa';
import labelService from '../service/label.service';
import { computedPagingValue } from '../utils/computedPagingValue';

class LabelController {
  async create(ctx: Context, next: Next) {
    const { name } = ctx.request.body;

    const isLabelExist = await labelService.hasLabel(name);
    if (!isLabelExist) {
      await labelService.create(name);
      ctx.body = {
        code: 200,
        message: '创建标签成功~'
      };
    } else {
      ctx.body = {
        code: 403,
        message: '标签重复，创建失败~'
      };
    }
  }

  async list(ctx: Context, next: Next) {
    const { pageSize, pageNum, name } = ctx.request.body;

    let where = 'WHERE 1 = 1';
    const values: any[] = [];
    if (name) {
      where += ` AND l.name = ?`;
      values.push(name);
    }
    const count = await labelService.getLabelCount(where, values);
    const [num, offset] = computedPagingValue(count, pageSize, pageNum);
    const result = await labelService.getLabels(where, values, offset, pageSize);

    ctx.body = {
      code: 200,
      message: '获取标签列表成功~',
      data: {
        list: result,
        count
      }
    };
  }

  async delete(ctx: Context, next: Next) {
    const { labelId } = ctx.params;

    await labelService.delete(labelId);

    ctx.body = {
      code: 200,
      message: '删除标签成功~',
      data: null
    };
  }

  async update(ctx: Context, next: Next) {
    const { labelId } = ctx.params;
    const { name } = ctx.request.body;

    const isLabelExist = await labelService.hasLabel(name);
    if (!isLabelExist) {
      await labelService.update(labelId, name);
      ctx.body = {
        code: 200,
        message: '更新标签成功~'
      };
    } else {
      ctx.body = {
        code: 403,
        message: '标签重复，更新失败~'
      };
    }
  }
}

export default new LabelController();
