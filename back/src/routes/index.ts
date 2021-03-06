import { Context, DefaultState } from "koa";
import Router from "koa-router";
import userRoutes from "@/routes/users/index";
import { list, login, register, listNews, me, listTasks, addTask, sortUser } from "./users/users.controller";
import checkNews from "@/middlewares/checkNews";
import checkAuth from "@/middlewares/checkAuth";

const router = new Router<DefaultState, Context>();

router.use(async (ctx, next) => {
  ctx.set("Pragma", "no-cache");
  ctx.set("Cache-Control", "no-cache, no-store");
  try {
    await next();
  } catch (error) {
    throw error;
  }
});

router.prefix("/");
router.get("/", (ctx: any) => {
  ctx.body = "Добро пожаловать в систему новостей";
});

router.post("/register", register.bind(this));
router.post("/login", login.bind(this));
router.post("/add_task", addTask.bind(this));
router.get("/news", checkNews, listNews);
router.get("/tasks", checkNews, listTasks);
router.get("/user/sort", checkNews, sortUser);
router.get("/users", checkNews, list);
router.get("/me", checkAuth, me.bind(this));

router.use(userRoutes.routes());

if (process.env.CONSOLE_URL === "true") {
  console.log("available routes:");
  let i = 0;
  router.stack.forEach((r, index) => {
    if (r.methods && r.path.indexOf("[^/]") < 0) {
      console.log(`${(i += 1)}. ${r.methods} url = ${r.path} `);
    }
  });
  console.log("======");
}

export default router;
