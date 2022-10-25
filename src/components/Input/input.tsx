import { ChangeEvent, FC, InputHTMLAttributes, ReactElement } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import classNames from 'classnames'
import Icon from '../Icon/icon'

type InputSize = 'lg' | 'sm'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    /**是否禁用 Input */
    disabled?: boolean;
    /**设置 input 大小，支持 lg 或者是 sm */
    size?: InputSize;
    /**添加图标，在右侧悬浮添加一个图标，用于提示 */
    icon?: IconProp;
    /**添加前缀 用于配置一些固定组合 */
    prepend?: string | ReactElement;
    /**添加后缀 用于配置一些固定组合 */
    append?: string | ReactElement;
    onChange? : (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 *
 * ~~~js
 * // 这样引用
 * import { Input } from 'zongone'
 * ~~~
 * 支持 HTMLInput 的所有基本属性
 */
export const Input: FC<InputProps> = (props) => {
  const { disabled, size, icon, prepend, append, style, ...restProps } = props
  const classes = classNames('zongone-input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-prepend': !!prepend,
    'input-group-append': !!append
  })

  if ('value' in props) {
    delete restProps.defaultValue
    if (typeof props.value === 'undefined' || props.value === null) {
      restProps.value = ''
    } else {
      restProps.value = props.value
    }
  }

  return (
    <div className={classes} style={style}>
      {prepend && <div className='zongone-input-group-prepend'>{prepend}</div>}
      {icon && <div className='icon-wrapper'><Icon icon={icon} title={`title-${icon}`}></Icon></div>}
      <input className='zongone-input-inner' disabled={disabled} {...restProps} />
      {append && <div className='zongone-input-group-append'>{append}</div>}
    </div>
  )
}

export default Input
