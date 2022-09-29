import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
export declare type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';
export interface IconProps extends FontAwesomeIconProps {
    /**设置 Icon 的类型 */
    theme?: ThemeProps;
    /**设置 Icon 的名称 */
    icon: IconProp;
}
/**
 * 页面中最常用的的图标元素
 * ### 引用方法
 *
 * ~~~js
 * import { Icon } from 'xxui'
 * ~~~
 */
export declare const Icon: React.FC<IconProps>;
export default Icon;
