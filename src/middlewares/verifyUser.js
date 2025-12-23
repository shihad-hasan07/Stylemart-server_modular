
export const verifyUser = (req, res, next) => {
    if (req.params.id !== req.user._id.toString()) {
        return res.status(403).json({ message: "Not your profile" });
    }
    next();
};
