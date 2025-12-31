import { Router } from "express";
import UserController from "./user.controller.js";
import upload from "../../middlewares/multer.middleware.js";
import { handleMulterError } from "../../middlewares/errorHandler.middleware.js";

const router = Router();

// router.get("/", UserController.getUsers);
router.get("/single", UserController.getSingleUser);

router.post("/create-user", UserController.createUser);

router.patch("/update/:id", (req, res, next) => {
    upload.single('image')(req, res, (err) => {
        if (err) return handleMulterError(err, req, res, next);
        UserController.updateUser(req, res);
    });
});

router.delete("/delete/:id", UserController.deleteUser);


router.get("/customers", UserController.getCustomers);


// ====== ADMIN USERS MANAGEMENT ROUTES - ADD THESE ======

router.get("/admin/all", UserController.getAdminUsers);
router.post("/admin/users", UserController.addAdminUser);
router.patch("/admin/users/:id", UserController.updateAdminRole);
router.delete("/admin/users/:id", UserController.deleteAdminUser);

export default router;
