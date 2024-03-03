import {
  HomeOutlined,
  LoginOutlined,
  SearchOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Drawer,
  Flex,
  Form,
  Grid,
  Input,
  InputNumber,
  Layout,
  Menu,
  Popover,
  Row,
  Select,
  Space,
} from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Search from "../content/Search";
import Header from "../header/Header";
import Banner from "../banner/Banner";
import Footer from "../footer/Footer";
import Tours from "../content/tour/Tours";
import Locations from "../content/location/Locations";

function Home() {
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(false);

  const handleChange = (name, value) => {
    const newSelectedValues = {
      ...selectedValues,
      [name]: value,
    };
    setSelectedValues(newSelectedValues);
    console.log(newSelectedValues);
  };

  const showBrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  // 65de2e88d5a81dc266766fb6
  return (
    <div>
      <Header />
      <Banner />
      {/* <Menu mode="horizontal">
        <Menu.Item key={"home"} icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key={"searchPage"} icon={<SearchOutlined />}>
          <Link to="/search">Search page</Link>
        </Menu.Item>

        <Menu.Item
          style={{ marginLeft: "auto" }}
          key={"signIn"}
          icon={<LoginOutlined />}
        >
          Sign In
        </Menu.Item>
        <Menu.Item key={"signUp"}>
          <Button type="primary" shape="round" onClick={showBrawer}>
            Sign Up
          </Button>
        </Menu.Item>
      </Menu>
      <Drawer title="Hella" placement="left" onClose={onClose} open={open}>
        <Flex vertical align="start">
          <Button type="text" href="/" icon={<HomeOutlined />}>
            Home
          </Button>
          <Button type="text" href="/profile" icon={<UserOutlined />}>
            Profile
          </Button>
          <Button type="text" href="/settings" icon={<SettingOutlined />}>
            Settings
          </Button>
        </Flex>
      </Drawer> */}
      {/** Flex only affect 2 attribute by width, height by maxWidth and maxHeight **/}
      {/* <Search /> */}
      <Tours />
      <Locations />
      <Footer key="footer" />
      {/* <div id="detail">
        <Outlet />
      </div> */}
    </div>
  );
}

export default Home;
