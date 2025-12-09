// utils/response.ts

export const apiSuccess = (res: any, data: any, message = "Success", status = 200) => {
    return res.status(status).json({
        success: true,
        message,
        data,
    });
};

export const apiError = (res: any, error: any, message = "Something went wrong", status = 500) => {
    return res.status(status).json({
        success: false,
        message,
        error: error?.message || error,
    });
};
