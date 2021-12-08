import checkAuth from "@/middlewares/checkAuth";
import { Context, DefaultState } from "koa";
import Router from "koa-router";
import {list, destroy, update} from "@/routes/users/users.controller";

const router = new Router<DefaultState, Context>();

router.prefix("/user");

router.delete("/delete/:id", checkAuth, destroy);
router.put("/update", checkAuth, update);

export default router;
