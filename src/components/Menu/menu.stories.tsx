import React from 'react'
import { storiesOf } from '@storybook/react'
import Menu from './menu'
import MenuItem from './menuItem'
import SubMenu from "./subMenu";

export const defaultMenu = () => (
    <Menu defaultIndex='0' mode='horizontal' defaultOpenSubMenus={['3']}>
        <MenuItem>cool link</MenuItem>
        <MenuItem>cool link 2</MenuItem>
        <MenuItem disabled>cool link 3</MenuItem>

        <SubMenu title="dropMenu">
            <MenuItem>drop 1</MenuItem>
            <MenuItem>drop 2</MenuItem>
            <MenuItem>drop 3</MenuItem>
        </SubMenu>
    </Menu>
)

storiesOf('Menu Component', module)
    .add('Menu', defaultMenu )