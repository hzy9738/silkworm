import axios from "axios";
import {ChangeEvent, FC, useRef} from "react";
import Button from "../Button/button";

export interface UploadProps {
    action: string;
    beforeUpload?: (file: File) => boolean | Promise<File>
    onProgress?: (percentage: number, file: File) => void;
    onSuccess?: (data: any, file: File) => void;
    onError?: (data: any, file: File) => void;
    onChange?: (file: File) => void;
}

const Upload: FC<UploadProps> = (props) => {
    const {action, beforeUpload, onProgress, onSuccess, onError, onChange} = props
    const fileInput = useRef<HTMLInputElement>(null)
    const handleClick = () => {
        if (fileInput.current) {
            fileInput.current.click()
        }
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) {
            return
        }
        uploadFiles(files)
        if (fileInput.current) {
            e.target.value = ''
        }
    }

    const uploadFiles = (files: FileList) => {
        let postFiles = Array.from(files)
        postFiles.forEach(file => {
            if (!beforeUpload) {
                post(file)
            } else {
                const result = beforeUpload(file)
                if (result) {
                    if (result instanceof Promise) {
                        result.then(processedFile => {
                            post(processedFile)
                        })
                    } else {
                        post(file)
                    }
                }

            }

        })
    }

    const post = (file: File) => {
        const formData = new FormData()
        formData.append(file.name, file)
        axios.post(action, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (e) => {
                let percentage = Math.round((e.loaded * 100) / e.total) || 0
                if (percentage < 100) {
                    console.log(percentage)
                    if (onProgress) {
                        onProgress(percentage, file)
                    }
                }
            }
        }).then(resp => {
            console.log(resp)
            if (onSuccess) {
                onSuccess(resp.data, file)
            }
            if (onChange) {
                onChange(file)
            }
        }).catch(error => {
            console.error(error)
            if (onError) {
                onError(error, file)
            }
            if (onChange) {
                onChange(file)
            }
        })
    }
    return (
        <div className="xx-upload-component">
            <Button btnType="primary" onClick={handleClick}>Upload File</Button>
            <input className="xx-file-input" style={{display: "none"}} onChange={handleFileChange} ref={fileInput}
                   type="file"/>
        </div>
    )
}

export default Upload;