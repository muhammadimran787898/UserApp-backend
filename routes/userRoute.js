import express from "express";
import {
  userAdd,
  userGet,
  userUpdate,
  userDelete,
  userList,
} from "../controllers/user.js";
import SchemaValidator from "../middleware/validator.js";
import { userUpadteSchema } from "../validations/userValidations.js";

const UserRouter = express.Router();

UserRouter.post("/useradd", userAdd);
UserRouter.get("/userget/:id", userGet);
UserRouter.get("/userlist/:limit/:page", userList);

UserRouter.patch(
  "/userupdate/:id",
  SchemaValidator(userUpadteSchema),
  userUpdate
);
UserRouter.delete("/userdelete/:id", userDelete);

export default UserRouter;
