import { Router } from "express";
import authRoute from "./authRoute.js";
import userRoute from "./userRoute.js";

const router = Router();

router.use("/auth", authRoute);
router.use("/user", userRoute);
export default router;
