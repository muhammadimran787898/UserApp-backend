import express from "express";
import Tokenvalidation from "../middleware/requireAuth.js";
import SchemaValidator from "../middleware/validator.js";
import {
  userRegisterschema,
  forgotpasswordschema,
  resetpasswordSchema,
} from "../validations/AuthValidations.js";
import {
  register,
  login,
  userDetail,
  forgotpassword,
  resetpassword,
} from "../controllers/auth.js";

const authRoute = express.Router();

authRoute.post("/register", SchemaValidator(userRegisterschema), register);
authRoute.post("/login", login);
authRoute.get("/userdetail", Tokenvalidation, userDetail);
authRoute.post(
  "/forgotpassword",
  SchemaValidator(forgotpasswordschema),
  forgotpassword
);
authRoute.post(
  "/resetpassword",
  SchemaValidator(resetpasswordSchema),
  resetpassword
);

export default authRoute;
