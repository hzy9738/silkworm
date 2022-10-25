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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classNames from 'classnames';
import Icon from '../Icon/icon';
/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 *
 * ~~~js
 * // 这样引用
 * import { Input } from 'zongone'
 * ~~~
 * 支持 HTMLInput 的所有基本属性
 */
export var Input = function (props) {
    var _a;
    var disabled = props.disabled, size = props.size, icon = props.icon, prepend = props.prepend, append = props.append, style = props.style, restProps = __rest(props, ["disabled", "size", "icon", "prepend", "append", "style"]);
    var classes = classNames('zongone-input-wrapper', (_a = {},
        _a["input-size-".concat(size)] = size,
        _a['is-disabled'] = disabled,
        _a['input-group'] = prepend || append,
        _a['input-group-prepend'] = !!prepend,
        _a['input-group-append'] = !!append,
        _a));
    if ('value' in props) {
        delete restProps.defaultValue;
        if (typeof props.value === 'undefined' || props.value === null) {
            restProps.value = '';
        }
        else {
            restProps.value = props.value;
        }
    }
    return (_jsxs("div", __assign({ className: classes, style: style }, { children: [prepend && _jsx("div", __assign({ className: 'zongone-input-group-prepend' }, { children: prepend })), icon && _jsx("div", __assign({ className: 'icon-wrapper' }, { children: _jsx(Icon, { icon: icon, title: "title-".concat(icon) }) })), _jsx("input", __assign({ className: 'zongone-input-inner', disabled: disabled }, restProps)), append && _jsx("div", __assign({ className: 'zongone-input-group-append' }, { children: append }))] })));
};
export default Input;
