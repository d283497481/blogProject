import { Context, Next } from 'koa';
import { IRule } from './../constants/global-types';
import {
  MISSING_REQUIRED_PARAMETERS,
  PARAMETER_VERIFICATION_FAILED
} from './../constants/error-types';

export function verifyParamsFn(rule: IRule[], requestData: any) {
  rule.forEach((item) => {
    if (item.filed in requestData) {
      if (item.pattern) {
        if (item.required) {
          if (!item.pattern.test(String(requestData[item.filed])))
            throw new Error(`${PARAMETER_VERIFICATION_FAILED}(${item.filed}: ${item.message})`);
        } else {
          if (
            requestData[item.filed] !== null &&
            requestData[item.filed] !== undefined &&
            !item.pattern.test(String(requestData[item.filed]))
          )
            throw new Error(`${PARAMETER_VERIFICATION_FAILED}(${item.filed}: ${item.message})`);
        }
      }

      if (requestData[item.filed] !== null && requestData[item.filed] !== undefined) {
        if (['string', 'boolean', 'number'].includes(item.type)) {
          if (typeof requestData[item.filed] !== item.type)
            throw new Error(`${PARAMETER_VERIFICATION_FAILED}(${item.filed}: ${item.message})`);
        } else if (item.type === 'array') {
          if (requestData[item.filed] && !(requestData[item.filed] instanceof Array))
            throw new Error(`${PARAMETER_VERIFICATION_FAILED}(${item.filed}: ${item.message})`);
        } else if (item.type === 'object') {
          if (requestData[item.filed] && !(requestData[item.filed] instanceof Object))
            throw new Error(`${PARAMETER_VERIFICATION_FAILED}(${item.filed}: ${item.message})`);
        }
      }
    } else {
      if (item.required) throw new Error(`${MISSING_REQUIRED_PARAMETERS}(${item.filed})`);
    }
  });
}

// 校验参数
export function verifyParams(rule: IRule[]) {
  return async function (ctx: Context, next: Next) {
    try {
      const { body, query } = ctx.request;
      const requestData = { ...body, ...query };
      verifyParamsFn(rule, requestData);
      await next();
    } catch (error) {
      ctx.app.emit('error', error, ctx);
    }
  };
}
