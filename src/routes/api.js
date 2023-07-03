import productRoute from "./components/productRoute";
function router(app) {
  app.use("/api/v1", productRoute);
}

module.exports = router;
