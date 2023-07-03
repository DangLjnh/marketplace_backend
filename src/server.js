import express from "express";
import initWebRoutes from "./routes/api";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 9999;
require("dotenv").config();
// configCors(app);
app.use(cors());

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//test connection

//init web routes
initWebRoutes(app);

app.listen(PORT, () => {
  console.log(">>> Backend Marketplace is running on the port: " + PORT);
});
