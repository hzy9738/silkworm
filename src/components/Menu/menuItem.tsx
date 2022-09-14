import classNames from 'classnames'
import React from "react";

export interface MenuItemProps {
    index?: number;
    disabled?: boolean ;
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactNode
}

const MenuItem: React.FC<MenuItemProps> = (props)=>{
    const {  disabled, className, children, style } = props
    const classes = classNames('menu-item',className,{
        'is-disabled': disabled
    })
    return (
        <li className={classes} style={style}> {children} </li>
    )
}

MenuItem.defaultProps = {
    index: 0
}

export default MenuItem