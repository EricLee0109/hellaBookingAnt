import { HomeOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu({ mode }) {
  return (
    <Menu mode={mode}>
      <Menu.Item
        className="centered-menu-item"
        icon={<HomeOutlined />}
        key="mail"
      >
        <Link to="/">Home</Link>
      </Menu.Item>
      <SubMenu title={<span>Tour</span>}>
        <MenuItemGroup title="Item 1">
          <Menu.Item key="">Option 1</Menu.Item>
          <Menu.Item key="">Option 2</Menu.Item>
        </MenuItemGroup>
        <MenuItemGroup title="Item 2">
          <Menu.Item key="">Option 3</Menu.Item>
          <Menu.Item key="">Option 4</Menu.Item>
        </MenuItemGroup>
      </SubMenu>
      <SubMenu title={<span>Tour Guide</span>}>
        <MenuItemGroup title="Item 1">
          <Menu.Item key="">Option 1</Menu.Item>
          <Menu.Item key="">Option 2</Menu.Item>
        </MenuItemGroup>
        <MenuItemGroup title="Item 2">
          <Menu.Item key="">Option 3</Menu.Item>
          <Menu.Item key="">Option 4</Menu.Item>
        </MenuItemGroup>
      </SubMenu>
    </Menu>
  );
}

export default LeftMenu;
