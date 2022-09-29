import { FC, ReactNode } from 'react';
export declare type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';
export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: UploadFileStatus;
    percent?: number;
    raw?: File;
    response?: any;
    error?: any;
}
export interface UploadProps {
    /** 上传url */
    action?: string;
    /** 初始文件列表 */
    defaultFileLst?: UploadFile[];
    /** 上传前行为 */
    beforeUpload?: (file: File) => boolean | Promise<File>;
    /** 上传进度回调 */
    onProgress?: (percentage: number, file: UploadFile) => void;
    /** 文件上传成功回调 */
    onSuccess?: (data: any, file: UploadFile) => void;
    /** 文件上传失败回调 */
    onError?: (data: any, file: UploadFile) => void;
    /** 文件上传失败或成功回调 */
    onChange?: (file: File) => void;
    /** 删除回调 */
    onRemove?: (file: UploadFile) => void;
    /** 自定义headers */
    headers?: {
        [key: string]: any;
    };
    /** 自定义name */
    name?: string;
    /** 自定义formData */
    data?: {
        [key: string]: any;
    };
    /** 是否携带cookie */
    withCredentials?: boolean;
    /** 限制可选文件类型 */
    accept?: string;
    /** 是否可多选 */
    multiple?: boolean;
    /** 是否可拖拽 */
    drag?: boolean;
    children?: ReactNode;
}
export declare const Upload: FC<UploadProps>;
export default Upload;
