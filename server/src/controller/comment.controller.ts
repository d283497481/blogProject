import { Context, Next } from 'koa';
import commentService from '../service/comment.service';
import { computedPagingValue } from '../utils/computedPagingValue';
import { arrayToTree } from '../utils';

class CommentController {
  async create(ctx: Context, next: Next) {
    const { id } = ctx.user;
    const { postId, content } = ctx.request.body;

    await commentService.create(content, postId, id);

    ctx.body = {
      code: 200,
      message: '评论发布成功~'
    };
  }

  async reply(ctx: Context, next: Next) {
    const { commentId } = ctx.params;
    const { postId, content } = ctx.request.body;
    const { id } = ctx.user;

    await commentService.reply(content, postId, id, commentId);

    ctx.body = {
      code: 200,
      message: '回复评论成功~'
    };
  }

  async update(ctx: Context, next: Next) {
    const { commentId } = ctx.params;
    const { content } = ctx.request.body;

    await commentService.update(content, commentId);

    ctx.body = {
      code: 200,
      message: '修改评论成功~'
    };
  }

  async remove(ctx: Context, next: Next) {
    const { commentId } = ctx.params;

    await commentService.remove(commentId);

    ctx.body = {
      code: 200,
      message: '删除评论成功~'
    };
  }

  async list(ctx: Context, next: Next) {
    const { postId, pageSize, pageNum } = ctx.request.body;

    const count = await commentService.getCommentCountByPostId(postId);
    const [num, offset] = computedPagingValue(count, pageSize, pageNum);
    const result = await commentService.getCommentByPostId(postId, offset, pageSize);

    const list = arrayToTree(result, 'commentId', null);

    ctx.body = {
      code: 200,
      message: '获取评论数据成功~',
      data: {
        list,
        count
      }
    };
  }
}

export default new CommentController();
