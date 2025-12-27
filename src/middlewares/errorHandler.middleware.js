import multer from "multer";

export const handleMulterError = (err, req, res, next) => {
  // Multer built-in errors
  if (err instanceof multer.MulterError) {
    let message = "File upload error";

    if (err.code === "LIMIT_FILE_SIZE") {
      message = "File size too large";
    }

    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      message = "Too many files uploaded or invalid field name";
    }

    return res.status(400).json({
      success: false,
      message,
    });
  }

  // Custom file filter error
  if (err?.message === "INVALID_FILE_TYPE") {
    return res.status(400).json({
      success: false,
      message: "Only image files are allowed",
    });
  }

  // Other errors → global error handler
  next(err);
};
