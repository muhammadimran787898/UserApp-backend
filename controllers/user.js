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

    const user = await newuser.save();
    res.status(201).json({ user, message: "user created", data: saveUser });
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
    // try {
    const user = await authModal.findByIdAndUpdate({ _id: id }, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Enforce schema validation
    });

    // const user = await authModal.updateOne(
    //   { _id: id },
    //   { $set: req.body },
    //   { runValidators: true }
    // );

    if (!user) {
      return res.status(500).json({ message: "user not found" });
    }
    // object.assign(user, req.body);

    res.status(200).json({ message: "user updated successfully" });
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
  console.log(req);
  const { limit,page } = req.params;
  const skip = (page - 1) * limit;
  try {
    // const users = await authModal.find().sort({ createdAt: -1 });
    const users = await authModal.find().limit(Number(limit)).skip(skip);

    const total = await authModal.countDocuments();
    // res.send({ status: "success", data: users });
    res.json({
      data: users,
      total,
      // page: Number(page),
      // totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.send({ status: "failed", error: error.message });
  }
};

const userDelete = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await authModal.findByIdAndDelete({ _id: id });

    console.log(user, "user");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      res
        .status(200)
        .json({ message: "User deleted successfully", data: user });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { userAdd, userGet, userUpdate, userList, userDelete };
