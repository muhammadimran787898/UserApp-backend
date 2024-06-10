import express from "express";
import Tokenvalidation from "../middleware/requireAuth.js";
import {
  register,
  login,
  userDetail,
  forgotpassword,
  resetpassword,
} from "../controllers/auth.js";

const authRoute = express.Router();

authRoute.post("/register", register);
authRoute.post("/login", login);
authRoute.get("/userdetail", Tokenvalidation, userDetail);
authRoute.post("/forgotpassword", Tokenvalidation, forgotpassword);
authRoute.post("/resetpassword", Tokenvalidation, resetpassword);

export default authRoute;
