import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Токен отсутствует" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = { userId: decoded.userId };

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Неверный или истёкший токен", error: error.message });
  }
};
