import { App, staticFiles } from "fresh";
import { define, MyContext, type State } from "@/utils.ts";
import "@std/dotenv/load";
import BasicLayout from "@/layout/BasicLayout.tsx";
import { changeTheme, getTheme } from "@/utils/theme.ts";

export const app = new App<State>();

app.layout("*", BasicLayout);
app.use(staticFiles());

// Middleware para valores compartidos
app.use(async (ctx: MyContext) => {
  ctx.state.shared = "hello";
  return await ctx.next();
});

app.get("/health", () => {
  return new Response("OK");
});

app.get("/theme/:name", (ctx: MyContext) => {
  const _themeName = ctx.params.name.toLowerCase(); // Usamos _ para evitar el error de lint
  changeTheme();
  ctx.state.theme = getTheme();
  return new Response(ctx.state.theme);
});

app.get("/api2/:name", (ctx: MyContext) => {
  const name = ctx.params.name;
  return new Response(
    `Hello, ${name.charAt(0).toUpperCase() + name.slice(1)}!`,
  );
});

const exampleLoggerMiddleware = define.middleware((ctx: MyContext) => {
  console.log(`${ctx.req.method} ${ctx.req.url}`);
  return ctx.next();
});

app.use(exampleLoggerMiddleware);

app.fsRoutes();