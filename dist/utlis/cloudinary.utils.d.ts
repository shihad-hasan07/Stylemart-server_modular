import type { UploadApiResponse } from 'cloudinary';
export declare const uploadOnCloudinary: (localFilePath: string) => Promise<UploadApiResponse | null>;
export declare const deleteFromCloudinary: (publicId: string) => Promise<any>;
//# sourceMappingURL=cloudinary.utils.d.ts.map