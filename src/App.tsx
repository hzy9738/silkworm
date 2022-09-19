import React, {useState} from 'react';
import Button from "./components/Button/button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import Icon from "./components/Icon/icon";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import Transition from "./components/Transition/transition";

library.add(fas)

function App() {
    const [show, setShow] = useState(false)
    return (
        <div className="App">
            <header className="App-header">

                <Icon icon='coffee' size="lg" theme='danger'/>

                <Menu defaultIndex='0' mode='horizontal' defaultOpenSubMenus={['3']}>
                    <MenuItem>cool link</MenuItem>
                    <MenuItem>cool link 2</MenuItem>
                    <MenuItem disabled>cool link 3</MenuItem>

                    <SubMenu title="dropMenu">
                        <MenuItem>drop 1</MenuItem>
                        <MenuItem>drop 2</MenuItem>
                        <MenuItem>drop 3</MenuItem>
                    </SubMenu>
                </Menu>


                <Button>Hello World</Button>
                <Button autoFocus btnType="primary" size="lg">Hello World</Button>
                <Button btnType="primary" disabled>Disabled Button</Button>
                <Button btnType="link" href="http://www.baidu.com" target="_blank">baidu link</Button>
                <Button btnType="link" disabled href="http://www.baidu.com" target="_blank">baidu
                    link</Button>


                <Button onClick={() => {
                    setShow(!show)
                }}>Transition Toggle</Button>

                <Transition wrapper={true} timeout={500} in={show} animation="zoom-in-top">
                    <Button>555</Button>
                </Transition>
            </header>
        </div>
    );
}

export default App;
