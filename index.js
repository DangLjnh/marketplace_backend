import app from "./src/server";

app.listen(PORT, () => {
  console.log(">>> Backend Marketplace is running on the port: " + PORT);
});
