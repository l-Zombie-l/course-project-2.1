import checkAuth from "@/middlewares/checkAuth";
import { Context, DefaultState } from "koa";
import Router from "koa-router";
import {list, destroy} from "@/routes/users/users.controller";

const router = new Router<DefaultState, Context>();

router.prefix("/user");
router.post("/", checkAuth, list);
router.delete("/delete/:id", checkAuth, destroy);

export default router;
