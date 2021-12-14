import Token from "@/db/models/Token.model";
import User from "@/db/models/User.model";
import { Context } from "koa";

export interface IKoaContext extends Context {
  user: User;
  params: any;
}

export interface IUserContext {
  id: number;
}

export interface INewsContext extends Context {
  user: IUserContext;
  params: any;
}

export interface IKoaTokenContext extends Context {
  token: Token;
  params: any;
}