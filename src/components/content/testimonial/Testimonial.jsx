import React, { useState } from "react";
import QueueAnim from "rc-queue-anim";
import OverPack from "rc-scroll-anim/lib/ScrollOverPack";
import { Row, Col } from "antd";

import Tetris from "../../../technology-comp/Tetris";
import Column from "../../../technology-comp/Column";
import Coordinate from "../../../technology-comp/Coordinate";
import Building from "../../../technology-comp/Building";
import Icon from "@ant-design/icons/lib/components/Icon";
import sunPlaza from "../../../img/plan_sunPlaza.jpg";

const pageData = [
  {
    avatar: sunPlaza,
    title: "Sun Plaza in Sapa",
    content: "This tour is organized carefully",
    links: [
      <a
        key="0"
        href="https://www.traveloka.com/vi-vn/explore/destination/dia-diem-du-lich-sapa-2/117169"
        target="_blank"
      >
        Swing Sapa&nbsp;
        <Icon type="right" />
      </a>,
      <a
        key="1"
        href="https://www.traveloka.com/vi-vn/explore/destination/dia-diem-du-lich-sapa-2/117169"
        target="_blank"
      >
        Muong Hoa Alley&nbsp;
        <Icon type="right" />
      </a>,
      // <a key="2" href="https://www.traveloka.com/vi-vn/explore/destination/dia-diem-du-lich-sapa-2/117169" target="_blank">
      //   Ta Van Vilage&nbsp;
      //   <Icon type="right" />
      // </a>,
    ],
    Bg: Tetris,
  },
  {
    title: "AntV",
    content: "简单、专业、拥有无限可能的数据可视化方案",
    links: (
      <a href="https://antv.alipay.com" target="_blank">
        查看详情&nbsp;&nbsp;
        <Icon type="right" />
      </a>
    ),
    Bg: Column,
  },
  {
    title: "AntG",
    content: "智能、自然、惊艳的互联网互动体验",
    links: <a>敬请期待</a>,
    Bg: Coordinate,
  },
  {
    title: "Egg",
    content: "Node.js & Koa，为企业级框架和应用而生",
    links: (
      <a href="https://eggjs.org" target="_blank">
        查看详情&nbsp;&nbsp;
        <Icon type="right" />
      </a>
    ),
    full: true,
    Bg: Building,
  },
];

function Testimonial() {
  const [hover, setHover] = useState(null);

  const handleMouseEnter = () => {
    setHover(hover);
  };
  const handleMouseLeave = () => {
    setHover(null);
  };

  // state = {
  //   hover: null,
  // };
  // onMouseEnter = (hover) => {
  //   this.setState({
  //     hover,
  //   });
  // };
  // onMouseLeave = () => {
  //   this.setState({
  //     hover: null,
  //   });
  // };
  const children = pageData.map((item, i) => {
    const colProps = {
      md: item.full ? 24 : 8,
      xs: 24,
    };
    return (
      <Col {...colProps} key={i.toString()} className="page2-item-wrapper">
        <div
          className={`page2-item${item.full ? " full" : ""}`}
          onMouseEnter={() => {
            handleMouseEnter(item.title);
          }}
          onMouseLeave={handleMouseLeave}
        >
          {/* <div className="page2-item-bg">
            {item.Bg && React.createElement(item.Bg, hover === item.title)}
          </div> */}
          <div className="page2-item-desc">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="card-container">
                <img src={item.avatar} alt="place" />
              </div>
            </div>
            <h4>{item.title}</h4>
            <p>{item.content}</p>
            <p className="page2-item-links">{item.links}</p>
          </div>
        </div>
      </Col>
    );
  });

  return (
    <div className="page-wrapper page2">
      <div className="page">
        <h1>简单可靠的技术</h1>
        <i />
        <OverPack className="page2-content">
          <QueueAnim component={Row} key="queue" type="bottom" leaveReverse>
            {children}
          </QueueAnim>
        </OverPack>
      </div>
    </div>
  );
}

export default Testimonial;
