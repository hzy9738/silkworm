import {FontAwesomeIcon, FontAwesomeIconProps} from "@fortawesome/react-fontawesome";
import React from "react";
import classNames from "classnames";
import { IconProp  } from '@fortawesome/fontawesome-svg-core'
export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'

export interface IconProps extends FontAwesomeIconProps {
    /**设置 Icon 的类型 */
    theme?: ThemeProps;
    /**设置 Icon 的名称 */
    icon: IconProp;
}

export const Icon: React.FC<IconProps> = (props) => {
    const {className, theme, ...restProps } = props
    const classes = classNames('xx-icon',className, {
        [`icon-${theme}`] : theme
    })
    return (
        <FontAwesomeIcon className={classes} {...restProps} />
    )
}



Icon.defaultProps = {
    theme:'primary',
    icon:'coffee'
}

export default Icon