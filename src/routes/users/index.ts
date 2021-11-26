import checkAuth from "@/middlewares/checkAuth";
import { Context, DefaultState } from "koa";
import Router from "koa-router";
import { create, list, createMessages } from "@/routes/users/users.controller";

const router = new Router<DefaultState, Context>();

router.prefix("/");
router.get("/users", checkAuth, list);
router.post("/users", checkAuth, create);
router.post("/messages", checkAuth, createMessages);

export default router;
