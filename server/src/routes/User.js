import express from "express";
import { loginController, registerController } from "../controller/User.js";
import { isAdmin, requireSignIn } from "../middleware/Auth.js";

const app = express.Router();
app.post("/register", registerController);
app.post("/login", loginController);
app.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
app.get("/is-admin", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

export default app;
