import { Router } from "express";
import UserController from "./user.controller.js";

const router = Router();

router.post("/create-user", UserController.createUser);

router.patch("/update/:id", UserController.updateUser);

router.delete("/delete/:id", UserController.deleteUser);

export default router;
