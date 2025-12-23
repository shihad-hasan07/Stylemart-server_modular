import admin from "../config/firebaseAdmin.config.js"
import { UserModel } from "../modules/users/user.model.js";

export const verifyFirebaseToken_andUser = async (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized access" })
    }

    try {
        const token = auth.split(" ")[1]
        const decoded = await admin.auth().verifyIdToken(token)

        const user = await UserModel.findOne({ email: decoded.email }).select("email role");
        if (!user) {
            return res.status(403).json({ message: "User not registered" })
        }

        req.user = user
        next()
    } catch {
        res.status(401).json({ message: "Invalid or expired token" })
    }
}