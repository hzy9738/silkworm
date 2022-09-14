import React from 'react';
import Button, {ButtonSize, ButtonType} from "./components/Button/button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Menu defaultIndex={0}>
              <MenuItem>cool link</MenuItem>
              <MenuItem>cool link 2</MenuItem>
              <MenuItem>cool link 3</MenuItem>
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
