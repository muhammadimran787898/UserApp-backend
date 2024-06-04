import Jwt from "jsonwebtoken";

export default function jsonwebtoken(id) {
  return Jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
}
