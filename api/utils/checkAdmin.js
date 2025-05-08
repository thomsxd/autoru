import User from "../models/User.js";
export const checkAdmin = async (req, res, next) => {
  if (!req.userId) {
    return res.status(401).json({ message: "Пользователь не авторизован" });
  }

  try {
    const user = await User.findById(req.userId);

    if (user && user.role === "admin") {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "Доступ только для администраторов" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Ошибка при проверке роли" });
  }
};
