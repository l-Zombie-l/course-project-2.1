import { IKoaContext } from "@/interfaces";
import { usersFactory } from "@/routes/users/users.service";
import { ServerValidationError } from "@/utils/errors";
import { transformAndValidate } from "class-transformer-validator";
import { IMessageDTO, INewDTO, IUserDTO } from "./dto";

export const list = async (ctx: IKoaContext) => {
  const usersList = await usersFactory().getList();
  ctx.body = { ...usersList };
};

export const create = async (ctx: IKoaContext) => {
  const body: IUserDTO = ctx.request.body;
 
  await transformAndValidate(IUserDTO, body).catch(
    (err: ServerValidationError) => {
      throw new ServerValidationError(err.errorCode,err.message)
    }
  );
  const result = await usersFactory().register(body);
  ctx.body = result;
};

export const loginUser = async (ctx: IKoaContext) => {
  const body: IUserDTO = ctx.request.body;
 
  await transformAndValidate(IUserDTO, body).catch(
    (err: ServerValidationError) => {
      throw new ServerValidationError(err.errorCode,err.message)
    }
  );
  const result = await usersFactory().login(body);
  ctx.body = result;
};

export const createMessages = async (ctx: IKoaContext) => {
  const body: IMessageDTO = ctx.request.body;
 
  await transformAndValidate(IMessageDTO, body).catch(
    (err: ServerValidationError) => {
      throw new ServerValidationError(err.errorCode,err.message)
    }
  );
  const result = await usersFactory().addMessage(body);
  ctx.body = result;
};

export const createNews = async (ctx: IKoaContext) => {
  const body: INewDTO = ctx.request.body;
 
  await transformAndValidate(INewDTO, body).catch(
    (err: ServerValidationError) => {
      throw new ServerValidationError(err.errorCode,err.message)
    }
  );
  const result = await usersFactory().addNews(body);
  ctx.body = result;
};
