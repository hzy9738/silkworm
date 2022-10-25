import axios from 'axios'
import { ChangeEvent, FC, ReactNode, useRef, useState } from 'react'
import UploadList from './uploadList'
import Dragger from './dragger'

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

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
    beforeUpload?: (file: File) => boolean | Promise<File>
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
    headers?: { [key: string]: any };
    /** 自定义name */
    name?: string;
    /** 自定义formData */
    data?: { [key: string]: any };
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

export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    defaultFileLst,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
    headers,
    name,
    data,
    withCredentials,
    accept,
    multiple,
    drag,
    children
  } = props
  const fileInput = useRef<HTMLInputElement>(null)
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileLst || [])

  const updateFileList = (uploadFile: UploadFile, uploadObj: Partial<UploadFile>) => {
    setFileList(prevList => {
      return prevList.map(file => {
        if (file.uid === uploadFile.uid) {
          return { ...file, ...uploadObj }
        } else {
          return file
        }
      })
    })
  }

  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }

  const handleRemove = (file: UploadFile) => {
    const files = fileList.filter(item => item.uid !== file.uid)
    setFileList(files)
    if (onRemove) {
      onRemove(file)
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
    if (!action) {
      console.error('action is empty')
      return
    }
    let _file: UploadFile = {
      uid: Date.now() + '-upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      raw: file,
      percent: 0
    }
    setFileList([_file, ...fileList])
    const formData = new FormData()
    formData.append(name || 'file', file)
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key])
      })
    }
    axios.post(action, formData, {
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data'
      },
      withCredentials,
      onUploadProgress: (e) => {
        let percentage = Math.round((e.loaded * 100) / e.total) || 0
        if (percentage < 100) {
          updateFileList(_file, { percent: percentage, status: 'uploading' })
          console.log(percentage)
          if (onProgress) {
            onProgress(percentage, { ..._file, percent: percentage, status: 'uploading' })
          }
        }
      }
    }).then(resp => {
      console.log(resp)
      updateFileList(_file, { percent: 100, status: 'success', response: resp.data, raw: file })
      if (onSuccess) {
        onSuccess(resp.data, { ..._file, percent: 100, status: 'success', response: resp.data, raw: file })
      }
      if (onChange) {
        onChange(file)
      }
    }).catch(error => {
      console.error(error)
      updateFileList(_file, { status: 'error', error: error, raw: file })
      if (onError) {
        onError(error, { ..._file, status: 'error', error: error, raw: file })
      }
      if (onChange) {
        onChange(file)
      }
    })
  }
  return (
    <div className='zongone-upload-component'>
      {/*<Button btnType="primary" onClick={handleClick}>Upload File</Button>*/}
      <div className='zongone-upload-input' style={{ display: 'inline-block' }} onClick={handleClick}>
        {drag ? <Dragger onFile={(files) => {
          uploadFiles(files)
        }}> {children} </Dragger> : children}
      </div>
      <input className='zongone-file-input'
        style={{ display: 'none' }}
        onChange={handleFileChange}
        ref={fileInput}
        accept={accept}
        multiple={multiple}
        type='file'/>
      <UploadList fileList={fileList} onRemove={handleRemove}/>
    </div>
  )
}

Upload.defaultProps = {
  name: 'file'
}
export default Upload
