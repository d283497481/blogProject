import { Context } from 'koa';
import {
  NAME_OR_PASSWORD_IS_REQUIRED,
  USERNAME_ALEADY_EXISTS,
  USER_DOES_NOT_EXISTS,
  INCORRECT_USERNAME_OR_PASSWORD,
  UNAUTHORIZED,
  UNPREMISSION,
  MISSING_REQUIRED_PARAMETERS,
  PARAMETER_VERIFICATION_FAILED
} from '../constants/error-types';

// 全局错误处理中间件
export function errorHandler(error: any, ctx: Context) {
  let status: number, message: string;
  switch (error.message) {
    case NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400;
      message = NAME_OR_PASSWORD_IS_REQUIRED;
      break;
    case USERNAME_ALEADY_EXISTS:
      status = 400;
      message = USERNAME_ALEADY_EXISTS;
      break;
    case USER_DOES_NOT_EXISTS:
      status = 401;
      message = USER_DOES_NOT_EXISTS;
      break;
    case INCORRECT_USERNAME_OR_PASSWORD:
      status = 401;
      message = INCORRECT_USERNAME_OR_PASSWORD;
      break;
    case UNAUTHORIZED:
      status = 401;
      message = UNAUTHORIZED;
      break;
    case UNPREMISSION:
      status = 400;
      message = UNPREMISSION;
      break;
    default:
      if (
        error.message.includes(MISSING_REQUIRED_PARAMETERS) ||
        error.message.includes(PARAMETER_VERIFICATION_FAILED)
      )
        status = 400;
      else status = 404;

      message = error.message;
  }

  ctx.status = status;
  ctx.body = {
    code: status,
    message,
    data: null
  };
}
