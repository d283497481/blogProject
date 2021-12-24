import path from 'path';
import fs from 'fs';
import { Context, Next } from 'koa';
import commentService from '../service/comment.service';
import fileService from '../service/file.service';
import postService from '../service/post.service';
import { computedPagingValue } from '../utils/computedPagingValue';
import { UNABLE_TO_FIND_RESOURCES } from '../constants/error-types';
import { notEmptyCheck } from '../utils';

class PostController {
  async create(ctx: Context, next: Next) {
    const { id } = ctx.user;
    const result = await postService.create({ ...ctx.request.body, userId: id });
    ctx.body = {
      code: 200,
      message: '发布文章成功~',
      data: result
    };
  }

  async details(ctx: Context, next: Next) {
    const { postId } = ctx.params;
    const post = await postService.getPostById(postId);
    const labels = await postService.getLabels(postId);
    const count = await commentService.getCommentCountByPostId(postId);
    if (post) {
      post.content = post.content ? post.content.toString('utf8') : post.content;
    }

    ctx.body = {
      code: 200,
      message: '获取文章详情成功~',
      data: {
        post,
        labels,
        commentCount: count
      }
    };
  }

  async list(ctx: Context, next: Next) {
    const { labels, title, userId, startTime, endTime, pageSize, pageNum } = ctx.request.body;
    let join = '';
    let where = 'WHERE 1 = 1';
    const values: any[] = [];
    if (labels && labels.length) {
      join += `INNER JOIN post_label pl ON pl.post_id = p.id`;
      where += ` AND pl.label_id in (${labels.map((item: any) => '?').join(', ')})`;
      values.push(...labels);
    }
    if (title) {
      where += ` AND p.title like ?`;
      values.push(`%${title}%`);
    }
    if (notEmptyCheck(userId)) {
      where += ` AND p.user_id = ?`;
      values.push(userId);
    }
    if (startTime) {
      where += ` AND p.createAt >= ?`;
      values.push(startTime);
    }
    if (endTime) {
      where += ` AND p.createAt < ?`;
      values.push(endTime);
    }
    const count: number = await postService.getPostCount(join, where, values);
    const [num, offset] = computedPagingValue(count, pageSize, pageNum);
    const result = await postService.getPostList(join, where, values, offset, pageSize);

    ctx.body = {
      code: 200,
      message: '获取文章列表成功~',
      data: {
        count,
        list: result
      }
    };
  }

  async update(ctx: Context, next: Next) {
    const { postId } = ctx.params;
    const { title, abstract, content } = ctx.request.body;

    await postService.update(postId, title, abstract, content);

    ctx.body = {
      code: 200,
      message: '文章修改成功~'
    };
  }

  async remove(ctx: Context, next: Next) {
    const { postId } = ctx.params;

    await postService.remove(postId);

    ctx.body = {
      code: 200,
      message: '删除文章成功~'
    };
  }

  async addLabels(ctx: Context, next: Next) {
    const { postId } = ctx.params;
    const { labels } = ctx.request.body;

    await postService.deleteLabel(postId);
    for (const labelId of labels) {
      await postService.addLabel(postId, labelId);
    }

    ctx.body = {
      code: 200,
      message: '文章标签添加成功~'
    };
  }

  async fileInfo(ctx: Context, next: Next) {
    try {
      const { filename } = ctx.params;
      const { type } = ctx.query;

      const [file] = await fileService.getFileByFilename(filename);
      if (file) {
        const { filepath, filename, mimetype } = file;
        let targetPath = filepath;
        if (type && ['large', 'middle', 'small'].includes(type as string)) {
          targetPath = `${path.dirname(filepath)}\\${filename.split('.')[0]}-${type}${path.extname(
            filename
          )}`;
        }
        ctx.response.set('content-type', mimetype);
        ctx.body = fs.createReadStream(targetPath);
      } else {
        throw new Error(UNABLE_TO_FIND_RESOURCES);
      }
    } catch (error) {
      ctx.app.emit('error', error, ctx);
    }
  }
}

export default new PostController();
