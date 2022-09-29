import React, { FC } from 'react';
import { ThemeProps } from '../Icon/icon';
export interface ProgressProps {
    /** 比例 */
    percent: number;
    /** 高度（px） */
    strokeHeight?: number;
    /** 是否显示文字 */
    showText?: boolean;
    styles?: React.CSSProperties;
    /**设置 Progress 的类型 */
    theme?: ThemeProps;
}
/**
 * 进度条元素
 * ### 引用方法
 *
 * ~~~js
 * import { Progress } from 'silkworm'
 * ~~~
 */
export declare const Progress: FC<ProgressProps>;
export default Progress;
