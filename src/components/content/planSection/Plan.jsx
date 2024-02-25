import { Button, Card, Col, Flex, Image, Row, Typography } from "antd";
import landmark81 from "../../../img/plan_landmark81.jpg";
import sunPlaza from "../../../img/plan_sunPlaza.jpg";
import QueueAnim from "rc-queue-anim";
import { OverPack } from "rc-scroll-anim";
import { page1 } from "../../data";

function Plan() {
  const { Text } = Typography;
  const { Title } = Typography;
  const { Meta } = Card;

  return (
    <div className="page-wrapper page1">
      <div className="page">
        <h1>Plan Your Pefect Trip</h1>
        <i />
        <OverPack>
          <QueueAnim key="queue" type="bottom" leaveReverse component={Row}>
            <Flex vertical justify="center" align="middle">
              <Row justify="center" align="middle">
                {/* <Col span={20}>
                  <Title type="warning">Plan Your Pefect Trip</Title>
                </Col> */}
                <Col offset={21} span={2}>
                  <Button>See more places</Button>
                </Col>
              </Row>
              <Row
                style={{ display: "flex", justifyContent: "center" }}
                gutter={[16, 16]}
              >
                <Col span={6}>
                  <Card
                    hoverable
                    style={{ width: 200 }}
                    cover={<Image alt="landmark81" src={landmark81} />}
                  >
                    <Meta
                      title="Landmark 81"
                      description="Visit the highest Saigon's Town"
                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card
                    hoverable
                    style={{ width: 200 }}
                    cover={<Image alt="landmark81" src={landmark81} />}
                  >
                    <Meta
                      title="Landmark 81"
                      description="Landmark 81 in Saigon"
                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card
                    hoverable
                    style={{ width: 200 }}
                    cover={<Image alt="landmark81" src={landmark81} />}
                  >
                    <Meta
                      title="Landmark 81"
                      description="Landmark 81 in Saigon"
                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card
                    hoverable
                    style={{ width: 200 }}
                    cover={<Image alt="landmark81" src={landmark81} />}
                  >
                    <Meta
                      title="Landmark 81"
                      description="Landmark 81 in Saigon"
                    />
                  </Card>
                </Col>

                <Col span={6}>
                  <Card
                    hoverable
                    style={{ width: 200 }}
                    cover={<Image alt="landmark81" src={landmark81} />}
                  >
                    <Meta
                      title="Landmark 81"
                      description="Landmark 81 in Saigon"
                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card
                    hoverable
                    style={{ width: 200 }}
                    cover={<Image alt="landmark81" src={landmark81} />}
                  >
                    <Meta
                      title="Landmark 81"
                      description="Landmark 81 in Saigon"
                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card
                    hoverable
                    style={{ width: 200 }}
                    cover={<Image alt="landmark81" src={landmark81} />}
                  >
                    <Meta
                      title="Landmark 81"
                      description="Landmark 81 in Saigon"
                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card
                    hoverable
                    style={{ width: 200 }}
                    cover={<Image alt="landmark81" src={landmark81} />}
                  >
                    <Meta
                      title="Landmark 81"
                      description="Landmark 81 in Saigon"
                    />
                  </Card>
                </Col>
              </Row>
            </Flex>
          </QueueAnim>
        </OverPack>
      </div>
    </div>
  );
}

export default Plan;
