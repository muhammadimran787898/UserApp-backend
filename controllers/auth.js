import validator from "validator";
import bcrypt from "bcrypt";
import { authModal } from "../models/authScheam.js";
import jsonwebtoken from "../utils/jwt.js";
import EmailSender from "../utils/mailer.js";

//Rigister

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userexist = await authModal.findOne({ email });
    if (userexist) {
      return res.status(409).json({ message: "User already exists" });
    }
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const saveUser = new authModal({ name, email, password: hashed });
    const user = await saveUser.save();

    console.log(name, email, "chod mcha ha ");

    EmailSender(name, email);

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//login

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(401)
      .json({ message: "you are not entering the valid field" });
  }

  const finder = await authModal.findOne({ email });
  if (!finder) {
    return res.status(500).json({ message: "user not exist" });
  }

  const isMatch = bcrypt.compare(password, finder.password);
  if (!isMatch) {
    return res.status(500).json({ message: "password not match" });
  }

  const token = jsonwebtoken(finder._id);

  res.status(201).json({ finder, token });
};

//userdetail

const userDetail = async (req, res) => {
  const id = req.user.id;

  try {
    const user = await authModal.findOne({ _id: id });
    console.log(user, "kkk");
    if (!user) {
      return res.status(500).json({ message: "user not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);

    // return res.status(500).json({ message: error.message });
  }
};

//frgotpassword

const forgotpassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await authModal.findOne({ email });
    if (!user) {
      return res.status(500).json({ message: "user not found" });
    }
    res.status(201).json({ message: "reset mail sent" });
    EmailSender(user.name, email, resetpassword);
  } catch (error) {}
};

//resetpssword

const resetpassword = async (req, res) => {
  const { password, id } = req.body;
  try {
    const existuser = await authModal.findOne({ _id: id });
    if (!existuser) {
      return res.status(500).json({ message: "user not found" });
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await authModal.findOneAndUpdate(
      { _id: id },
      { password: hashed }
    );

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export { register, login, userDetail, forgotpassword, resetpassword };
