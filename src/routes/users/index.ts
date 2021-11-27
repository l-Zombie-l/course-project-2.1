import checkAuth from "@/middlewares/checkAuth";
import { Context, DefaultState } from "koa";
import Router from "koa-router";
import {list, createMessages, createNews } from "@/routes/users/users.controller";

const router = new Router<DefaultState, Context>();

router.prefix("/");
router.get("/users", checkAuth, list);
router.post("/messages", checkAuth, createMessages);
router.post("/new", checkAuth, createNews);

export default router;
