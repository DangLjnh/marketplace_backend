import userRouter from "./components/userRoute";
import groupRouter from "./components/groupRoute";
import roleRouter from "./components/roleRoute";
import addressRoute from "./components/addressRoute";
import shopRoute from "./components/shopRoute";
function router(app) {
  app.use("/api/v1", userRouter);
  app.use("/api/v1", groupRouter);
  app.use("/api/v1", roleRouter);
  app.use("/api/v1", addressRoute);
  app.use("/api/v1", shopRoute);
}

module.exports = router;
