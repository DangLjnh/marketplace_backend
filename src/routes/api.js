import userRouter from "./components/user";
function router(app) {
  app.use("/", userRouter);
}

module.exports = router;
