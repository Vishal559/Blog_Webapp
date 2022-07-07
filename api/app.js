const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

app.use(
  cors({
    origin: "*",
  })
);
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const categoryRoute = require("./routes/category");

const multer = require("multer");
const path = require("path");

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

app.get("/api/auth", (req, res) => {
  console.log(process.env.NODE_ENV);
  console.log(process.env.PORT);
  console.log(process.env.NODE_ENV);
  res.send("server is running");
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Backend is running.");
});
