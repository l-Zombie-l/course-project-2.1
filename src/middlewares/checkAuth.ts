import { IKoaContext } from "@/interfaces/index";
import { AuthenticatioError } from "@/utils/errors";
import { verifyUserToken } from "@/utils/helper";
import { Next } from "koa";

export default async (ctx: IKoaContext, next: Next) => {
  let token: string;

  if(ctx.request.headers && ctx.request.headers['authorization']){
    token = ctx.request.headers['authorization'].split('Bearer')[1];
  }
  if(!token){
    throw new AuthenticatioError();
  }
  
  const verify = await verifyUserToken(token);

  ctx.user = verify.user;

  await next();
};
