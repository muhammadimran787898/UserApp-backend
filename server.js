import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ConnectDB } from "./config/dbconnecion.js";
import router from "./routes/index.js";

const port = 5000;
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

ConnectDB();
