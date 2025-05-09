import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";

import {
  requestAuthCode,
  verifyAuthCode,
} from "./controllers/UserController.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
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

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  }
  if (err.message === "Неподдерживаемый формат файла") {
    return res.status(400).json({ message: err.message });
  }
  next(err);
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

app.post("/auth", requestAuthCode);
app.post("/auth/verify-code", verifyAuthCode);

app.use("/uploads", express.static("uploads"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Внутренняя ошибка сервера" });
});

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Успешное подключение к базе данных");

    app.listen(process.env.PORT, () => {
      console.log(`Сервер запущен на http://localhost:${process.env.PORT}`);
    });
  } catch (err) {
    console.error("Ошибка при подключении к базе данных:", err);
    process.exit(1);
  }
}

start();
