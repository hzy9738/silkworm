import React from 'react';
import Button, {ButtonSize, ButtonType} from "./components/Button/button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import Icon from "./components/Icon/icon";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";

library.add(fas)
function App() {
  return (
    <div className="App">
      <header className="App-header">

          <Icon icon='coffee' size="lg" theme='danger' />
          
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
        <Button autoFocus btnType={ButtonType.Primary} size={ButtonSize.Large}>Hello World</Button>
        <Button btnType={ButtonType.Primary} disabled>Disabled Button</Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com" target="_blank">baidu link</Button>
        <Button btnType={ButtonType.Link} disabled href="http://www.baidu.com" target="_blank">baidu link</Button>
      </header>
    </div>
  );
}

export default App;
