import React from 'react'
import {storiesOf} from '@storybook/react'
import Upload, {UploadFile} from "./upload";
import {action} from "@storybook/addon-actions";
import Button from "../Button/button";
import Icon from "../Icon/icon";

const beforeUpload = (file: File) => {
    if (file.size > 500 * 1024) {
        alert('file is too big')
        return false
    }
    return true
}

const defaultFileList: UploadFile[] = [
    {uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30},
    {uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30},
    {uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30}
]

export const defaultUpload = () => (
    <Upload
        action="https://run.mocky.io/v3/3cb0e7bb-8a0a-4ef2-a2c2-b857865188a2"
        defaultFileLst={defaultFileList}
        onProgress={action('onProgress')}
        onSuccess={action('onSuccess')}
        onError={action('onError')}
        onChange={action('onChange')}
        beforeUpload={beforeUpload}
    >
        <Button btnType="primary" size="sm">上传文件</Button>
    </Upload>
)

export const draggerUpload = () => (
    <Upload
        drag={true}
        beforeUpload={beforeUpload}
    >
        <div style={{height: '100%', display: "flex", alignItems: 'center', justifyContent: 'center'}}>
            <Icon icon='add' theme='dark' />
        </div>
    </Upload>
)


storiesOf('Upload Component', module)
    .add('Upload', defaultUpload)
    .add('拖拽 Upload', draggerUpload)
