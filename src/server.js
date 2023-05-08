import express from "express";
import initWebRoutes from "./routes/api";
import { configPassport } from "./controller/passportController";
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");
import bodyParser from "body-parser";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 9999;
require("dotenv").config();

// config cloud
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
});

// config upload file
app.use(fileUpload());

// config cors
// configCors(app);
app.use(cors());

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//test connection

// config passport
configPassport();

//init web routes
initWebRoutes(app);

app.listen(PORT, () => {
  console.log(">>> Backend Marketplace is running on the port: " + PORT);
});
