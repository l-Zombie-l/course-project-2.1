import { IKoaContext, IKoaTokenContext} from "@/interfaces";
import { usersFactory } from "@/routes/users/users.service";
import { ServerValidationError } from "@/utils/errors";
import { transformAndValidate } from "class-transformer-validator";
import { IMessageDTO, INewsCreateDTO, IUserCreateDTO, IUserLoginDTO, IUserUpdateDTO, IGetNewsDTO } from "./dto";

export const list = async (ctx: IKoaContext) => {
  const usersList = await usersFactory().getList();
  ctx.body = { ...usersList };
};

export const listNews = async (ctx: IKoaContext) => {
  const newsList = await usersFactory().getNews();
  ctx.body = { ...newsList };
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
  const body: INewsCreateDTO = ctx.request.body;

  await transformAndValidate(INewsCreateDTO, body).catch(
    (err: ServerValidationError) => {
      throw new ServerValidationError(err.errorCode, err.message)
    }
  );
  const result = await usersFactory().addNews(ctx.user.id, body);
  ctx.body = result;
};

export const destroy = async (ctx: IKoaContext) => {
  const result = await usersFactory().destroy(ctx.user, ctx.params.id);
  ctx.body = result;
};

export const logout = async (ctx: IKoaContext) => {
  const result = await usersFactory().logout(ctx.user.id);
  ctx.body = result;
};

export const update = async (ctx: IKoaContext) => {
  const body: IUserUpdateDTO = ctx.request.body;

  const result = await usersFactory().update(ctx.user.id, body);
  ctx.body = result;
};

export const updateNews = async (ctx: IKoaContext) => {
  const body: INewsCreateDTO = ctx.request.body;

  const result = await usersFactory().updateNews(ctx.user.id, body);
  ctx.body = result;
};

export const read = async (ctx: IKoaContext) => {
  const result = await usersFactory().read(ctx.params.id);
  ctx.body = result;
};

export const me = async (ctx: IKoaContext) => {
  const result = await usersFactory().read(ctx.user.id);
  ctx.body = result;
};