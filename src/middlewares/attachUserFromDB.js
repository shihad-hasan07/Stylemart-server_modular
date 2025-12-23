import { UserModel } from "../modules/users/user.model"

export const attachUserFromDB = async (req, res, next) => {
    const user = await UserModel.findOne({ email: req.firebaseUser.email })
    if (!user) {
        return res.status(403).json({ message: "User not registered" })
    }
    req.user = user
    next()
}