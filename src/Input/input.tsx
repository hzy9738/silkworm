import {FC, InputHTMLAttributes, ReactElement, ReactNode} from "react";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames";
import Icon from "../components/Icon/icon";

type InputSize = 'lg' | 'sm'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    disabled?:boolean;
    size?:InputSize;
    icon?:IconProp;
    prepend?:string | ReactElement;
    append?:string | ReactElement;
    children: ReactNode;
    className?: string;
}

export const Input: FC<InputProps> = (props)=>{
    const { disabled,size,icon,prepend,append,children,style,...restProps} = props
    const classes = classNames('xx-input-wrapper',{
        [`input-size-${size}`] : size,
        'is-disabled': disabled,
        'input-group': prepend || append,
        'input-group-prepend': !!prepend,
        'input-group-append': !!append,
    })

    return (
        <div className={classes} style={style}>
            {prepend && <div className='xx-input-group-prepend'>{prepend}</div>}
            {icon && <div className='icon-wrapper'> <Icon icon={icon} title={`title-${icon}`}></Icon> </div>}
            <input className='xx-input-inner' disabled={disabled} {...restProps} />
            {append && <div className='xx-input-group-append'>{append}</div>}
        </div>
    )
}

export default Input