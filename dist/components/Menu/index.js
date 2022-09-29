import { Menu } from './menu';
import { MenuItem } from './menuItem';
import { SubMenu } from './subMenu';
var TranSMenu = Menu;
TranSMenu.Item = MenuItem;
TranSMenu.SubMenu = SubMenu;
export default TranSMenu;
