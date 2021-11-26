import { Context, DefaultState } from "koa";
import Router from "koa-router";
import userRoutes from "@/routes/users/index";

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
