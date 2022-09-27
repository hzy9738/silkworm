import React from 'react'
import {storiesOf} from '@storybook/react'
import Upload from "./upload";
import {action} from "@storybook/addon-actions";

const beforeUpload = (file: File) => {
    if (file.size > 500 * 1024) {
        alert('file is too big')
        return  false
    }
    return true
}

export const defaultUpload = () => (


    <Upload
        action="https://run.mocky.io/v3/8bfac469-9584-4884-a877-65bd16675267"
        onProgress={action('onProgress')}
        onSuccess={action('onSuccess')}
        onError={action('onError')}
        onChange={action('onChange')}
        beforeUpload={beforeUpload}
    />
)

storiesOf('Upload Component', module)
    .add('Upload', defaultUpload)
