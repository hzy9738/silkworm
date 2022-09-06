import React from 'react';
import Button, {ButtonSize, ButtonType} from "./components/Button/button";

function App() {
  return (
    <div className="App">
      <header className="App-header">
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
