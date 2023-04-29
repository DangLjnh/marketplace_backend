import userRouter from "./components/user";
import groupRouter from "./components/group";
import roleRouter from "./components/role";
function router(app) {
  app.use("/api/v1/auth", userRouter);
  app.use("/api/v1/group", groupRouter);
  app.use("/api/v1/role", roleRouter);
}

module.exports = router;
