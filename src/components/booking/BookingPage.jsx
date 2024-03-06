import React, { useState, useRef, useEffect } from "react";
import {
  Layout,
  Menu,
  Carousel,
  Button,
  Card,
  Typography,
  Rate,
  Row,
  Col,
  Modal,
  Calendar,
  Badge,
} from "antd";
import {
  EnvironmentFilled,
  CalendarOutlined,
  CarTwoTone,
  FireTwoTone,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./BookingPage.css";

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

const BookingPage = () => {
  const [selectedTour, setSelectedTour] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [tourPrice, setTourPrice] = useState({
    "2024-03-03": 750000,
    "2024-03-09": 800000,
    "2024-03-10": 850000,
  });

  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const bookingNavigate = useNavigate();
  const tourSectionRef = useRef(null);

  const scrollToTourSection = () => {
    tourSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const carouselImages = [
    [
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgd_6dVxQJShOe-IX58LpZtPyDuSuN6OIZrrNdtwxEFo2fGIZvLfJyGtZcTTXo9qKxFwSVD2sCaZNhq7pgRRnJ0BGXd6jkKmUey17TrK2IWp0n-YHwZiSnXXA-1vbZRtypUvaFq9pvt93mH/s1600/Anh-bia-phong-canh-thien-nhien-+(12).jpg",
      "https://i.pinimg.com/564x/c8/2c/cd/c82ccddacbdfdc0484536b82cf2374c2.jpg",
      "https://res.klook.com/image/upload/fl_lossy.progressive,w_800,c_fill,q_85/destination/lbnwgbgs4eqnzlvozlql.jpg",
      "https://eholiday.vn/wp-content/uploads/2021/01/8-ly-do-ban-nen-den-ha-noi-1-lan-trong-doi-4.jpg",
    ],
  ];

  const handleBookTour = () => {
    bookingNavigate("/booking");
  };

  const handleDateChange = (value) => {
    setSelectedDate(value);
  };

  const handleTourPriceChange = (value) => {
    setTourPrice({ ...tourPrice, [selectedDate]: value });
  };

  const handleOpenCalendarModal = () => {
    setIsCalendarVisible(true);
  };

  const handleCloseCalendarModal = () => {
    setIsCalendarVisible(false);
  };

  const handleCalendarButtonClick = () => {
    handleOpenCalendarModal();
  };

  const onFinish = (values) => {
    setSelectedMonth(values.month);
    setSelectedYear(values.year);
  };
  useEffect(() => {
    const updateBoxPosition = () => {
      const floatingBox = document.getElementById("floating-box");
      if (window.innerWidth < 992) {
        floatingBox.style.display = "none";
      } else {
        floatingBox.style.display = "block";
      }
    };

    window.addEventListener("resize", updateBoxPosition);

    return () => {
      window.removeEventListener("resize", updateBoxPosition);
    };
  }, []);

  return (
    <Layout className="landing-page">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">Trang chủ</Menu.Item>
          <Menu.Item key="2">Giới thiệu</Menu.Item>
          <Menu.Item key="3">Liên hệ</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "90px 100px" }}>
        <div className="site-layout-content">
          <div style={{ marginTop: "70px", marginBottom: "50px" }}>
            <Carousel
              autoplay
              autoplaySpeed={4000}
              style={{ width: "92%", height: "600px", margin: "50px" }}
            >
              {carouselImages.map((imageGroup, index) => (
                <div key={index}>
                  <div style={{ textAlign: "left" }}>
                    <h1
                      style={{
                        fontSize: "2rem",
                        fontWeight: "bold",
                        marginBottom: "20px",
                        display: "flex",
                      }}
                    >
                      <EnvironmentFilled /> Hà Nội - Tour
                    </h1>
                  </div>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={imageGroup[0]}
                        alt={`Image ${index + 1}`}
                        style={{
                          width: "100%",
                          height: "400px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      {imageGroup.slice(1).map((imageUrl, imageIndex) => (
                        <div
                          key={imageIndex}
                          style={{
                            width: "200%",
                            border: "1px solid #ccc",
                            borderRadius: "1px",
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src={imageUrl}
                            alt={`Image ${index + 1}.${imageIndex + 1}`}
                            style={{
                              width: "200%",
                              height: "200px",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
        <div style={{ padding: "55px", maxWidth: "1700px", margin: "0 auto" }}>
          <Row gutter={19}>
            <Col span={18}>
              <Card style={{ marginBottom: "5px" }}>
                <ul class="horizontal-list">
                  <ul style={{ display: "flex", listStyleType: "none" }}>
                    <li style={{ marginRight: "100px" }}>
                      <CarTwoTone /> Transportation service
                    </li>
                    <li style={{ marginRight: "90px" }}>
                      <FireTwoTone /> Fire
                    </li>
                  </ul>
                </ul>
                <Title level={4}>Thông tin tour</Title>
                <Rate disabled defaultValue={4.5} />
                <Text> 9.2 Tuyệt vời | Từ 34 đánh giá </Text>
                <br />
                <br />
                <div
                  style={{
                    width: "700px",
                  }}
                >
                  <Text
                    strong
                    style={{
                      fontSize: "16px",
                      color: "#333",
                    }}
                  >
                    Dưới đây là một phần nhỏ của những trải nghiệm tuyệt vời bạn
                    sẽ có trong chuyến hành trình tại Hà Nội. Ngoài ra, bạn còn
                    có cơ hội tham quan các điểm đến nổi tiếng như Chùa Hương,
                    Khu di tích Lịch sử Thăng Long, Văn Miếu - Quốc Tử Giám, và
                    nhiều địa điểm khác.
                  </Text>
                  <br />
                </div>

                <div class="schedule">
                  <div class="schedule-item">
                    <div class="time">07:30-12:00</div>
                    <div>
                      Xe cùng hướng dẫn viên đón khách tại khách sạn khởi hành
                      đi thăm Vịnh Hạ Long (chỉ áp dụng với vé khởi hành từ Hà
                      Nội).
                    </div>
                  </div>
                  <div class="schedule-item">
                    <div class="time">12:00-12:15</div>
                    <div>
                      Quý khách đến bến cảng tàu Hạ Long và làm thủ tục lên tàu.
                    </div>
                  </div>
                  <div class="schedule-item">
                    <div class="time">12:15-14:00</div>
                    <div>
                      Tàu rời bến bắt đầu chuyến thăm quan du ngoạn Vịnh Hạ
                      Long, tàu sẽ đi ngang qua các hòn đá lớn nhỏ với tên gọi
                      đặc biệt như: Hòn Gà Chọi, hòn Chó Đá, hòn Đỉnh Hương. Quý
                      khách dùng bữa cơm trưa trên tàu.
                    </div>
                  </div>
                  <div class="schedule-item">
                    <div class="time">14:00-16:30</div>
                    <div>
                      Quý khách thăm quan Hang Sửng Sốt, một trong những hang
                      động đẹp nhất vịnh Hạ Long. Tiếp đó, tàu di chuyển đến
                      Hang Luồn, du khách có thể chèo kayak/đò hoặc nghỉ ngơi
                      trên tàu. Tiếp theo, tàu sẽ đưa khách đến với đảo Ti Top.
                      Quý khách có thể tắm biển tại bãi tắm TiTop với bãi cát
                      trắng, hoặc trekking leo lên đỉnh núi Ti Top ngắm nhìn
                      toàn cảnh Vịnh Hạ Long.
                    </div>
                  </div>
                  <div class="schedule-item">
                    <div class="time">16:30-18:00</div>
                    <div>
                      Quay trở lại tàu để khởi hành về lại cảng Hạ Long. Quý
                      khách có thể nghe nhạc và thư giãn trên boong tàu, hòa
                      mình vào thiên nhiên.
                    </div>
                  </div>
                  <div class="schedule-item">
                    <div class="time">18:00-21:30</div>
                    <div>
                      Tàu cập bến. Chia tay nhà tàu và lên xe về Hà Nội (chỉ áp
                      dụng với vé khởi hành từ Hà Nội). Kết thúc tour.
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Badge.Ribbon text="Thông tin uy tín" color="green">
                  <Card.Meta
                    title="Tour"
                    description={
                      <>
                        <div>
                          <Rate disabled defaultValue={5} />
                          <br></br>
                          <span>
                            {" "}
                            Địa điểm hàng đầu: Được khách đán ghi đánh giá cao
                            (9.9 điểm)
                          </span>
                        </div>
                        <div>
                          <Badge
                            status="processing"
                            text="Có chỗ đậu xe riêng miễn phí trong khuôn viên"
                          />
                        </div>
                      </>
                    }
                  />
                </Badge.Ribbon>
                <br></br>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={scrollToTourSection}
                  style={{
                    backgroundColor: "#FF8C00",
                    borderColor: "#FF8C00",
                    marginLeft: "auto",
                    fontSize: "14px",
                  }}
                >
                  Đặt Tour Ngay
                </Button>
                <div style={{ marginTop: "16px" }}>
                  Khách nói rằng mô tả và hình ảnh chỗ nghỉ này rất đúng với sự
                  thật.
                </div>
              </Card>
              <div
                id="floating-box"
                style={{
                  position: "fixed",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 1000,
                  background: "white",
                  padding: "1rem",
                  borderRadius: "4px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  display: window.innerWidth < 992 ? "none" : "block", 
                }}
              >
                <div style={{ marginBottom: "1rem" }}>
                  <strong>Hỗ trợ khách hàng</strong>
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  Hotline: <a href="tel:19001888">1900 1888</a>
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  Email:{" "}
                  <a href="mailto:info@saigontourist.net">Hella@email.net</a>
                </div>
                <Button
                  type="primary"
                  style={{ backgroundColor: "#FF8C00", borderColor: "#FF8C00" }}
                >
                  Bạn muốn được gọi lại?
                </Button>
              </div>
            </Col>
          </Row>
        </div>

        <div ref={tourSectionRef}>
          <div
            style={{
              padding: "55px",
              maxWidth: "1700px",
              marginBottom: "0px",
              marginTop: "-90px",
            }}
          >
            <Card title="Tour ghép - Khởi hành tại Phú Quốc">
              <Row gutter={16}>
                <Col span={24}>
                  <Button
                    type="primary"
                    icon={<CalendarOutlined />}
                    onClick={handleCalendarButtonClick}
                    style={{ marginBottom: 16, borderRadius: "8px" }}
                  >
                    Xem lịch
                  </Button>
                  <Modal
                    title="Lịch"
                    visible={isCalendarVisible}
                    onCancel={handleCloseCalendarModal}
                    footer={null}
                    width={800}
                  >
                    <Calendar fullscreen={false} />
                  </Modal>
                  <Button.Group>
                    {[...Array(11).keys()].map((day) => (
                      <Button
                        key={day}
                        className="date-pill"
                        onClick={() => handleDateChange(`${day + 13} thg 3`)}
                      >
                        {day + 13} thg 3
                      </Button>
                    ))}
                  </Button.Group>
                </Col>
              </Row>
              <Card>
                <Row align="middle" justify="space-between">
                  <Col>
                    <Title level={4} style={{ color: "#FF8C00" }}>
                      {tourPrice[selectedDate]} Tour ghép cho tối đa 40 khách -
                      Khởi hành TPHCM | Bay Vietjet Air
                    </Title>
                  </Col>
                  <Col>
                    <Button
                      type="primary"
                      className="booking-button"
                      style={{ backgroundColor: "#FF8C00" }}
                      onClick={handleBookTour}
                    >
                      Đặt Tour Ngay
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Card>
          </div>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>©2024 by Travel Agency</Footer>
    </Layout>
  );
};

export default BookingPage;
