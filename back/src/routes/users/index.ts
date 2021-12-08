import checkAuth from "@/middlewares/checkAuth";
import { Context, DefaultState } from "koa";
import Router from "koa-router";
import {destroy, update, logout} from "@/routes/users/users.controller";

const router = new Router<DefaultState, Context>();

router.prefix("/user");

router.delete("/delete/:id", checkAuth, destroy);
router.get("/logout", checkAuth, logout);
router.put("/update", checkAuth, update);

export default router;
