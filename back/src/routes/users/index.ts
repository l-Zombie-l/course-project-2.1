import checkAuth from "@/middlewares/checkAuth";
import { Context, DefaultState } from "koa";
import Router from "koa-router";
import {destroy, update, logout, createNews, updateNews, read, newsOne, tasksList} from "@/routes/users/users.controller";

const router = new Router<DefaultState, Context>();

router.prefix("/user");
router.use(checkAuth.bind(this))

router.delete("/delete/:id", destroy.bind(this));
router.get("/logout", logout.bind(this));
router.put("/update", update.bind(this));
router.post("/add_news", createNews.bind(this));
router.put("/update_news/:id", updateNews.bind(this));
router.get("/info/:id", read.bind(this));
router.get("/news/:id", newsOne.bind(this));
router.get("/tasks", tasksList.bind(this));

export default router;
