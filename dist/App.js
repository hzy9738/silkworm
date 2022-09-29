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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import Button from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon/icon';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Transition from './components/Transition/transition';
library.add(fas);
function App() {
    var _a = useState(false), show = _a[0], setShow = _a[1];
    return (_jsx("div", __assign({ className: 'App' }, { children: _jsxs("header", __assign({ className: 'App-header' }, { children: [_jsx(Icon, { icon: 'coffee', size: 'lg', theme: 'danger' }), _jsxs(Menu, __assign({ defaultIndex: '0', mode: 'horizontal', defaultOpenSubMenus: ['3'] }, { children: [_jsx(MenuItem, { children: "cool link" }), _jsx(MenuItem, { children: "cool link 2" }), _jsx(MenuItem, __assign({ disabled: true }, { children: "cool link 3" })), _jsxs(SubMenu, __assign({ title: 'dropMenu' }, { children: [_jsx(MenuItem, { children: "drop 1" }), _jsx(MenuItem, { children: "drop 2" }), _jsx(MenuItem, { children: "drop 3" })] }))] })), _jsx(Button, { children: "Hello World" }), _jsx(Button, __assign({ autoFocus: true, btnType: 'primary', size: 'lg' }, { children: "Hello World" })), _jsx(Button, __assign({ btnType: 'primary', disabled: true }, { children: "Disabled Button" })), _jsx(Button, __assign({ btnType: 'link', href: 'http://www.baidu.com', target: '_blank' }, { children: "baidu link" })), _jsx(Button, __assign({ btnType: 'link', disabled: true, href: 'http://www.baidu.com', target: '_blank' }, { children: "baidu link" })), _jsx(Button, __assign({ onClick: function () {
                        setShow(!show);
                    } }, { children: "Transition Toggle" })), _jsx(Transition, __assign({ wrapper: true, timeout: 500, in: show, animation: 'zoom-in-top' }, { children: _jsx(Button, { children: "555" }) }))] })) })));
}
export default App;
