import express from "express";
import Tokenvalidation from "../middleware/requireAuth.js";
import {
  register,
  login,
  userDetail,
  forgotpassword,
  resetpassword,
} from "../controllers/auth.js";

const userRoute = express.Router();

userRoute.post("/register", register);
userRoute.post("/login", login);
userRoute.get("/userdetail", Tokenvalidation, userDetail);
userRoute.post("/forgotpassword", Tokenvalidation, forgotpassword);
userRoute.post("/resetpassword", Tokenvalidation, resetpassword);

export default userRoute;
