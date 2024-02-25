import { Col, Row, Tooltip } from "antd";
import { header } from "../data";

function Header() {
  const menuChild = header.map((item, i) => {
    const content = item.children.map((child, ii) => (
      <a href={child.link} key={ii.toString()} className="tip-block">
        <span className="tip-img">
          <img src={child.img} alt="img" />
        </span>
        <div className="tip-content">
          {child.title}
          <div>{child.desc}</div>
        </div>
      </a>
    ));
    return (
      <Col key={i.toString()} span={6}>
        <Tooltip
          title={content}
          placement="bottom"
          overlayClassName="header-tip-wrap"
        >
          <span className="nav-title">{item.title}</span>
        </Tooltip>
      </Col>
    );
  });
  return (
    <header>
      <Row className="nav">{menuChild}</Row>
    </header>
  );
}

export default Header;
