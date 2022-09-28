import React from 'react'

import Icon from './icon'
import { storiesOf } from '@storybook/react'

const defaultButton = () => (
  <Icon icon='coffee'/>
)

const iconWithSize = () => (
  <>
    <Icon icon='coffee' size='lg'/>
    <Icon icon='coffee' size='sm'/>
  </>
)

const iconWithType = () => (
  <>
    <Icon theme='primary' icon='coffee'/>
    <Icon theme='danger' icon='coffee'/>
    <Icon theme='success' icon='coffee'/>
  </>
)

storiesOf('Icon Component', module)
  .add('Icon', defaultButton)
  .add('不同尺寸的 Icon', iconWithSize)
  .add('不同类型的 Icon', iconWithType)
