import authService from "../services/authService";
import passport from "passport";
import nodemailer from "nodemailer";
import "dotenv/config";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";
const { Vonage } = require("@vonage/server-sdk");

const registerUser = async (req, res) => {
  const { username, password, phone } = req.body;
  if (!username || !password || !phone) {
    return res.status(500).json({
      EM: "Missing required parameters!",
      EC: -1,
      DT: "",
    });
  }
  try {
    let data = await authService.registerUserService(req.body);
    return res.status(200).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: data.DT,
    });
  } catch (error) {
    return res.status(500).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: data.DT,
    });
  }
};

const loginUser = async (req, res, next) => {
  passport.authenticate("local", function (error, user, info) {
    if (error) {
      return res.status(500).json(error);
    }
    if (!user) {
      return res.status(401).json(info.message);
    }
    return res.status(200).json({ ...user });
  })(req, res, next);
};

const verifyToken = async (req, res) => {
  try {
    let data = await authService.verifyTokenService(req.body);
    return res.status(200).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: data.DT,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: authController.js:55 ~ verifyToken ~ error:",
      error
    );
    return res.status(500).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: data.DT,
    });
  }
};

const sendEmail = async (req, res) => {
  const OTP = Math.floor(100000 + Math.random() * 900000);
  const __dirname = path.resolve();
  const filePath = path.join(__dirname, "/src/template/followOrder.html");
  const source = fs.readFileSync(filePath, "utf-8").toString();
  const template = handlebars.compile(source);
  const replacements = {
    username: req.body.email,
    otp: OTP,
  };
  const htmlToSend = template(replacements);

  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.GOOGLE_APP_EMAIL, // generated ethereal user
        pass: process.env.GOOGLE_APP_PASSWORD, // generated ethereal password
      },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: `E-Market 🤖" <${process.env.GOOGLE_APP_EMAIL}>`, // sender address
      to: req.body.email, // list of receivers
      subject: "Thông tin chi tiết đơn hàng", // Subject line
      // text: "Hello world?", // plain text body
      html: htmlToSend, // html body
    });
    console.log("🚀 ~ file: authController.js:89 ~ sendEmail ~ info:", info);
  } catch (error) {
    console.log("🚀 ~ file: authController.js:90 ~ sendEmail ~ error:", error);
  }
  return res.status(200).json({
    EM: "Send email successfully!", //error message
    EC: 0, //error code
    DT: { email: req.body.email },
  });
};

const sendCode = async (req, res) => {
  const vonage = new Vonage({
    apiKey: "010a4049",
    apiSecret: "1JrjQSUjXDlQeKeE",
  });
  const from = "32";
  const to = "84969552196";
  const text = "A text message sent using the Vonage SMS API";

  await vonage.sms
    .send({ to, from, text })
    .then((resp) => {
      console.log("Message sent successfully");
      console.log(resp);
    })
    .catch((err) => {
      console.log("There was an error sending the messages.");
      console.error(err);
    });
};

module.exports = { registerUser, loginUser, verifyToken, sendEmail, sendCode };
