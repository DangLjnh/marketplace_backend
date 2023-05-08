import app from "./src/server";

app.listen(8000, () => {
  console.log(">>> Backend Marketplace is running on the port: " + 8000);
});
