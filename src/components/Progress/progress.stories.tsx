import React from 'react'
import {storiesOf} from '@storybook/react'
import Progress from "./progress";


export const defaultProgress = () => (
    <Progress
        percent={30}
    />
)


storiesOf('Progress Component', module)
    .add('Progress', defaultProgress)

