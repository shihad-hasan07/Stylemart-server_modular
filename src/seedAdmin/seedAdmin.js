import { UserModel } from "../modules/users/user.model.js";

export default async function seedAdmin() {
    const adminEmail = process.env.SUPER_ADMIN_EMAIL;

    const admin = await UserModel.findOne({ email: adminEmail });

    if (admin && admin.role !== "admin") {
        admin.role = "admin";
        await admin.save();
        console.log("Super admin promoted");
    }
};
