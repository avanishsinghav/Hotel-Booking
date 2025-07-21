import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
import { connectToDb } from "./src/config/db.js";
// routes immport
import authRoutes from "./src/routes/User.js";
import postRoutes from "./src/routes/Post.js";
import categoryRoutes from "./src/routes/Category.js";
import paymentRoutes from "./src/routes/Booking.js";

dotenv.config();
connectToDb();
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(fileUpload({ useTempFiles: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  console.log("Welcome ");
  res.send("Welcome to the API");
});

app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/booking", paymentRoutes);

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
