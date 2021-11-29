import { IKoaContext } from "@/interfaces";
import { usersFactory } from "@/routes/users/users.service";
import { ServerValidationError } from "@/utils/errors";
import { transformAndValidate } from "class-transformer-validator";
import { IMessageDTO, INewDTO, IUserCreateDTO, IUserLoginDTO } from "./dto";

export const list = async (ctx: IKoaContext) => {
  const usersList = await usersFactory().getList();
  ctx.body = { ...usersList };
};

export const register = async (ctx: IKoaContext) => {
  const body: IUserCreateDTO = ctx.request.body;

  await transformAndValidate(IUserCreateDTO, body).catch(
    (err: ServerValidationError) => {
      throw new ServerValidationError(err.errorCode, err.message)
    }
  );
  const result = await usersFactory().register(body);
  ctx.body = result;
};

export const login = async (ctx: IKoaContext) => {
  const body: IUserLoginDTO = ctx.request.body;

  await transformAndValidate(IUserLoginDTO, body).catch(
    (err: ServerValidationError) => {
      throw new ServerValidationError(err.errorCode, err.message)
    }
  );
  const result = await usersFactory().login(body);
  ctx.body = result;
};

export const createMessages = async (ctx: IKoaContext) => {
  const body: IMessageDTO = ctx.request.body;

  await transformAndValidate(IMessageDTO, body).catch(
    (err: ServerValidationError) => {
      throw new ServerValidationError(err.errorCode, err.message)
    }
  );
  const result = await usersFactory().addMessage(body);
  ctx.body = result;
};

export const createNews = async (ctx: IKoaContext) => {
  const body: INewDTO = ctx.request.body;

  await transformAndValidate(INewDTO, body).catch(
    (err: ServerValidationError) => {
      throw new ServerValidationError(err.errorCode, err.message)
    }
  );
  const result = await usersFactory().addNews(body);
  ctx.body = result;
};

export const destroy = async (ctx: IKoaContext) => {
  const result = await usersFactory().destroy(ctx.user, ctx.params.id);
  ctx.body = result;
};
