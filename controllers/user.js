import { authModal } from "../models/authScheam.js";
import sendEmail from "../middleware/mailer.js";

//useradd

const userAdd = async (req, res) => {
  try {
    const { name, email, address, age, country, gender, mobile, state, city } =
      req.body;
    const newuser = new authModal({
      name,
      email,
      address,
      age,
      country,
      gender,
      mobile,
      state,
      city,
    });
    const saveUser = await authModal(newuser);
    console.log(saveUser);
    const user = await newuser.save();
    res.status(201).json({ user, message: "user created" });
    sendEmail(
      email,
      "user created successfully",
      `Hello ${name} its just a Testing Message`
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const userUpdate = async (req, res) => {
  
  const id = req.params.id;

  try {
    const user = await authModal.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(500).json({ message: "user not found" });
    }
    res.send(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//getSingleUser
const userGet = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await authModal.findById(id);

    res.send({ status: "success", data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//userlist

const userList = async (req, res) => {
  try {
    const users = await authModal.find().sort({ createdAt: -1 });
    res.send({ status: "success", data: users });
  } catch (error) {
    res.send({ status: "failed", error: error.message });
  }
};

const userDelete = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await authModal.findByIdAndDelete(id);

    console.log(user, "user");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({ message: "User deleted successfully", user });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { userAdd, userGet, userUpdate, userList, userDelete };
