import { Context, Next } from 'koa';
import { APP_HOST, APP_PORT } from '../app/config';
import fileService from '../service/file.service';
import userService from '../service/user.service';

class FileController {
  async saveAvatarInfo(ctx: Context, name: Next) {
    const { path, filename, mimetype, size } = ctx.file;
    const { id } = ctx.user;

    await fileService.saveAvatarInfo(path, filename, mimetype, size, id);

    const avatarUrl = `${APP_HOST}:${APP_PORT}/user/${id}/avatar`;
    await userService.updateAvatarUrlByUserId(avatarUrl, id);

    ctx.body = {
      code: 200,
      message: '用户头像上传成功~',
      data: avatarUrl
    };
  }

  async savePictrueInfo(ctx: Context, name: Next) {
    const { files } = ctx;
    const { id } = ctx.user;
    const { postId } = ctx.query;

    for (let file of files) {
      const { path, filename, mimetype, size } = file;
      await fileService.createFile(path, filename, mimetype, size, Number(postId), id);
    }

    ctx.body = {
      code: 200,
      message: '文章配图上传成功~'
    };
  }
}

export default new FileController();
