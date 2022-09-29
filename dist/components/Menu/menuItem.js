var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsxs as _jsxs } from "react/jsx-runtime";
import classNames from 'classnames';
import { useContext } from 'react';
import { MenuContext } from './menu';
export var MenuItem = function (props) {
    var disabled = props.disabled, className = props.className, children = props.children, style = props.style, index = props.index;
    var context = useContext(MenuContext);
    var classes = classNames('menu-item', className, {
        'is-disabled': disabled,
        'is-active': context.index === index
    });
    var handleClick = function () {
        if (context.onSelect && !disabled && typeof index === 'string') {
            context.onSelect(index);
        }
    };
    return (_jsxs("li", __assign({ className: classes, style: style, onClick: handleClick }, { children: [" ", children, " "] })));
};
MenuItem.defaultProps = {
    index: '0'
};
MenuItem.displayName = 'MenuItem';
export default MenuItem;
