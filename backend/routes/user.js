import express from "express";
import { register,login,logout,logged } from "../controller/user.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
const router=express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticated,logged);
export default router;