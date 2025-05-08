import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import multer from "multer";
import rateLimit from "express-rate-limit";
import cors from "cors";
import { registerValidations, loginValidations } from "./validations.js";
import checkAuth from "./utils/checkAuth.js";
import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";

import { checkAdmin } from "./utils/checkAdmin.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  message: { error: "Слишком много  запросов, попробуйте позже" },
});
app.use(limiter);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  }
  next(err);
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(file.originalname.toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extname && mimeType) {
      return cb(null, true);
    } else {
      return cb(new Error("Неподдерживаемый формат файла"), false);
    }
  },
});
app.get("/", (req, res) => {
  res.send("Сервер работает!");
});

app.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "Нет файла для загрузки." });
  }

  console.log("Загружен файл:", file);

  res.status(200).json({
    fileUrl: `/uploads/${file.filename}`,
  });
});

app.use("/uploads", express.static("uploads"));

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Успешное подключение к базе данных");
  } catch (err) {
    console.error("Ошибка при подключении к базе данных:", err);
  }

  app.listen(process.env.PORT, () => {
    console.log(`Сервер запущен на http://localhost:${process.env.PORT}`);
  });
}

start();
