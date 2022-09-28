import React, { FC } from 'react'
import { ThemeProps } from '../Icon/icon'

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
 * import { Progress } from 'xxui'
 * ~~~
 */
export const Progress: FC<ProgressProps> = (props) => {
  const {
    percent,
    strokeHeight,
    showText,
    styles,
    theme
  } = props
  return (
    <div className='xx-progress-bar' style={styles}>
      <div className='xx-progress-bar-outer' style={{ height: `${strokeHeight}px` }}>
        <div
          className={`xx-progress-bar-inner color-${theme}`}
          style={{ width: `${percent}%` }}
        >
          {showText && <span className='inner-text'>{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  )
}

Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: 'primary'
}
export default Progress
