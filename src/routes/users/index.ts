import checkAuth from "@/middlewares/checkAuth";
import { Context, DefaultState } from "koa";
import Router from "koa-router";
import { create, list, createMessages, loginUser, createNews } from "@/routes/users/users.controller";

const router = new Router<DefaultState, Context>();

router.prefix("/");
router.get("/users", checkAuth, list);
router.post("/users", checkAuth, create);
router.post("/login", checkAuth, loginUser);
router.post("/messages", checkAuth, createMessages);
router.post("/new", checkAuth, createNews);

export default router;
