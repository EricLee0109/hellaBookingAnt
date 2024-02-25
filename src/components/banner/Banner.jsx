import "rc-banner-anim/assets/index.css";
import React from "react";
import QueueAnim from "rc-queue-anim";
import BannerAnim from "rc-banner-anim";
import { Button } from "antd";
import { banner } from "../data";

const { Element } = BannerAnim;
const { BgElement } = Element;
import { useState } from "react";
import { DatePicker, Divider, Flex, Form, InputNumber, Select } from "antd";

const { RangePicker } = DatePicker;

function Banner() {
  // getDuration = (e) => {
  //   if (e.key === "map") {
  //     return 800;
  //   }
  //   return 1000;
  // };

  const [selectedValues, setSelectedValues] = useState({
    from: "HoChiMinh",
    to: "HaNoi",
    departReturn: [],
    passenger: {
      adult: 1,
      children: 0,
      baby: 0,
    },
  });

  const onFinish = (values) => {
    console.log(values);
  };

  const handleChange = (name, value) => {
    const newSelectedValues = {
      ...selectedValues,
      [name]: value,
    };
    setSelectedValues(newSelectedValues);
    console.log(newSelectedValues);
  };

  // render() {
  //   const { isMobile } = this.props;
  //   const bannerChildren = banner.map((item, i) => {
  //     const children = item.children.map((child, ii) => {
  //       const tag = child.tag === "button" ? "div" : child.tag || "p";
  //       const childrenToRender =
  //         child.tag === "button" ? (
  //           <Button>
  //             <a href={child.link} target="_blank">
  //               {child.children}
  //             </a>
  //           </Button>
  //         ) : (
  //           child.children
  //         );
  //       return React.createElement(
  //         tag,
  //         {
  //           key: ii.toString(),
  //           className: child.className,
  //           style: child.style || {},
  //         },
  //         childrenToRender
  //       );
  //     });
  return (
    <div className="banner page-wrapper">
      <div className="page">
        <div className="logo" />
        <p className="logoName">Hella</p>
        <BannerAnim type="across" duration={550} ease="easeInOutQuint">
          <Element>
            <BgElement
              key="bg"
              className="banner-bg"
              style={{
                // backgroundImage: `url(${isMobile ? item.imgMobile : item.img})`,
                backgroundImage:
                  "url(https://gw.alipayobjects.com/zos/rmsportal/cTyLQiaRrpzxFAuWwoDQ.svg)",
              }}
            />
            <Flex style={{ height: 600 }} justify="center" align="center">
              <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
              >
                <Flex vertical>
                  <Divider orientation="left">Location</Divider>
                  <Flex vertical={false} justify="space-around" gap={16}>
                    <Form.Item
                      labelCol={{ span: 5 }}
                      initialValue="HoChiMinh"
                      label="From"
                      name="from"
                    >
                      <Select
                        defaultValue="HoChiMinh"
                        style={{
                          width: 200,
                        }}
                        onChange={(value) => handleChange("from", value)}
                        options={[
                          {
                            value: "HoChiMinh",
                            label: "Ho Chi Minh",
                          },
                          {
                            value: "Hanoi",
                            label: "Ha Noi",
                          },
                          {
                            value: "DaNang",
                            label: "Da Nang",
                          },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item initialValue="Hanoi" label="To" name="to">
                      <Select
                        defaultValue="Hanoi"
                        style={{
                          width: 200,
                        }}
                        onChange={(value) => handleChange("to", value)}
                        options={[
                          {
                            value: "HoChiMinh",
                            label: "Ho Chi Minh",
                          },
                          {
                            value: "Hanoi",
                            label: "Ha Noi",
                          },
                          {
                            value: "DaNang",
                            label: "Da Nang",
                          },
                        ]}
                      />
                    </Form.Item>
                  </Flex>
                  <Divider orientation="left">Time</Divider>
                  <Flex vertical={false}>
                    <Form.Item
                      wrapperCol={{ offset: 0, span: 16 }}
                      labelCol={{ span: 11 }}
                      label="Depart & Return"
                      name="departReturn"
                    >
                      <RangePicker
                        onChange={(value) =>
                          handleChange("departReturn", value)
                        }
                      />
                    </Form.Item>
                  </Flex>
                  <Divider orientation="left">Passenger</Divider>
                  <Flex vertical={false} justify="space-evenly" gap={16}>
                    <Form.Item
                      labelCol={{ span: 8 }}
                      label="Adult"
                      name="adult"
                    >
                      <InputNumber
                        defaultValue={1}
                        onChange={(value) => handleChange("adult", value)}
                        min={1}
                        max={10}
                        step={1}
                      />
                    </Form.Item>
                    <Form.Item
                      labelCol={{ span: 10 }}
                      label="Children"
                      name="children"
                    >
                      <InputNumber
                        defaultValue={0}
                        onChange={(value) => handleChange("children", value)}
                        min={1}
                        max={10}
                        step={1}
                      />
                    </Form.Item>
                    <Form.Item labelCol={{ span: 8 }} label="Baby" name="baby">
                      <InputNumber
                        defaultValue={0}
                        onChange={(value) => handleChange("baby", value)}
                        min={1}
                        max={4}
                        step={1}
                      />
                    </Form.Item>
                  </Flex>
                  <Form.Item wrapperCol={{ offset: 22 }}>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Flex>
              </Form>
            </Flex>
          </Element>
        </BannerAnim>
      </div>
    </div>
  );
}

export default Banner;
