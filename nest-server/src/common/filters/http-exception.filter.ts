import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class FiltershttpExceptionFilter implements ExceptionFilter {
  /**
   *
   * @param exception 异常状态
   * @param host http 请求状态
   */
  catch(exception: HttpException, host: ArgumentsHost) {
    /**
     * 切换到http
     * 接口使用方法检索HTTP参数
     */
    const ctx = host.switchToHttp();
    // 获取错误参数
    const response = ctx.getResponse();
    // 获取错误请求
    const { params, body, query, method, url } = ctx.getRequest();
    // 获取错误状态
    const status = exception.getStatus();

    const exceptionRes: any = exception.getResponse();

    const { error, message } = exceptionRes;

    response.status(status).json({
      status,
      method: method,
      timestamp: new Date().toISOString(),
      path: url,
      data: { ...params, ...body, ...query },
      error,
      message,
    });
  }
}
