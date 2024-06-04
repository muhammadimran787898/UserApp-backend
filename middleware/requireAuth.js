import jwt from "jsonwebtoken";

export default function Tokenvalidation(req, res, next) {
  const token = req.headers.token;
  try {
    if (!token) {
      return res.status(401).json({ message: "token not found" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(500).json({ message: err });
      }
      (req.user = user), next();
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}
