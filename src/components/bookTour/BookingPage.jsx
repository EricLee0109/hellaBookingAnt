import React, { useState, useRef, useEffect } from "react";
import {
  Layout,
  Menu,
  Carousel,
  Button,
  Card,
  InputNumber,
  Typography,
  Rate,
  Row,
  Col,
  Modal,
  Calendar,
  Badge,
  Input,
} from "antd";
import {
  EnvironmentFilled,
  CalendarOutlined,
  CarTwoTone,
  FireTwoTone,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./BookingPage.css";

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

const BookingPage = () => {
  const [selectedTour, setSelectedTour] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const displayCount = 5;

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
  const [tourGuide, setTourGuide] = useState("");
  <Input
    placeholder="Tour Guide"
    value={tourGuide}
    onChange={(e) => setTourGuide(e.target.value)}
  />;
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
  const dates = [
    { day: "Thu 2", date: "11 thg 3", fullDate: "2024-03-11" },
    { day: "Thu 3", date: "12 thg 3", fullDate: "2024-03-12" },
    { day: "Thu 4", date: "13 thg 3", fullDate: "2024-03-13" },
    { day: "Thu 5", date: "14 thg 3", fullDate: "2024-03-14" },
    { day: "Thu 6", date: "15 thg 3", fullDate: "2024-03-15" },
    { day: "Thu 7", date: "16 thg 3", fullDate: "2024-03-16" },
    { day: "Thu CN", date: "17 thg 3", fullDate: "2024-03-17" },
    { day: "Thu 2", date: "18 thg 3", fullDate: "2024-03-18" },
    { day: "Thu 3", date: "19 thg 3", fullDate: "2024-03-19" },
    { day: "Thu 4", date: "20 thg 3", fullDate: "2024-03-20" },
  ];

  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const adultPrice = 1000;
  const childPrice = 0;
  const getTotalPrice = () => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(adultCount * adultPrice + childCount * childPrice);
  };
  const currentDates = dates.slice(currentIndex, currentIndex + displayCount);
  const changeDateSet = (direction) => {
    const newIndex =
      direction === "left"
        ? currentIndex - displayCount
        : currentIndex + displayCount;
    if (newIndex >= 0 && newIndex < dates.length) {
      setCurrentIndex(newIndex);
    }
  };
  const dateSelector = (
    <div className="date-selector-container">
      <Button
        shape="circle"
        icon={<LeftOutlined />}
        onClick={() => changeDateSet("left")}
      />
      <div className="dates-scroll-container">
        {currentDates.map((date, index) => (
          <div
            key={index}
            className={`date-item ${selectedDate === date.fullDate ? "selected" : ""}`}
            onClick={() => setSelectedDate(date.fullDate)}
          >
            {date.day}
            <br />
            {date.date}
          </div>
        ))}
      </div>
      <Button
        shape="circle"
        icon={<RightOutlined />}
        onClick={() => changeDateSet("right")}
      />
    </div>
  );
  return (
    <Layout className="landing-page">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">Home</Menu.Item>
          <Menu.Item key="2">About</Menu.Item>
          <Menu.Item key="3">Contact</Menu.Item>
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
                        backgroundColor: "#F0FFFF",
                        padding: "10px",
                        borderRadius: "10px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <EnvironmentFilled style={{ marginRight: "10px" }} />{" "}
                      Hanoi - Tour
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
        <div style={{ padding: "55px", maxWidth: "1800px", margin: "0 auto" }}>
          <Row gutter={0}>
            <Col span={18}>
              <Card style={{ marginBottom: "px" }}>
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
                <Title level={4}>Tour Information</Title>
                <Rate disabled defaultValue={4.5} />
                <Text> 9.2 Great | From 34 reviews </Text>
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
                    Here is a small part of the great experiences you will have
                    on your journey in Hanoi. Additionally, you will have the
                    opportunity to visit famous destinations such as Perfume
                    Pagoda, Thang Long Imperial Citadel, Temple of Literature,
                    and many other places.
                  </Text>
                  <br />
                </div>

                <div class="schedule">
                  <div class="schedule-item">
                    <div class="time">07:30-12:00</div>
                    <div>
                      Bus with guide pick up guests at the hotel to visit Halong
                      Bay (only applicable to tickets departing from Hanoi).
                    </div>
                  </div>
                  <div class="schedule-item">
                    <div class="time">12:00-12:15</div>
                    <div>
                      Guests arrive at Halong Bay cruise port and board.
                    </div>
                  </div>
                  <div class="schedule-item">
                    <div class="time">12:15-14:00</div>
                    <div>
                      The ship departs and starts the Halong Bay cruise, passing
                      through large and small rock formations with special names
                      like: Fighting Cock Island, Dog Stone, Dinh Huong Islet.
                      Guests have lunch on board.
                    </div>
                  </div>
                  <div class="schedule-item">
                    <div class="time">14:00-16:30</div>
                    <div>
                      Guests visit Surprising Cave, one of the most beautiful
                      caves in Halong Bay. Then, the ship moves to Luon Cave,
                      where guests can kayak/row or rest on the ship. Next, the
                      ship takes guests to Ti Top Island. Guests can swim at
                      TiTop beach with white sand, or trek up Ti Top mountain to
                      enjoy the panoramic view of Halong Bay.
                    </div>
                  </div>
                  <div class="schedule-item">
                    <div class="time">16:30-18:00</div>
                    <div>
                      Return to the ship to return to Halong port. Guests can
                      listen to music and relax on the ship's deck, immerse
                      themselves in nature.
                    </div>
                  </div>
                  <div class="schedule-item">
                    <div class="time">18:00-21:30</div>
                    <div>
                      The ship docks. Farewell to the ship and board the car
                      back to Hanoi (only applicable to tickets departing from
                      Hanoi). End of tour.
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col span={6} style={{ marginLeft: "0px" }}>
              <div style={{ margin: "10px" }}>
                <Card
                  style={{
                    flexGrow: 1,
                    textAlign: "left",
                    backgroundColor: "#FFF5EE",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    margin: "5px",
                  }}
                >
                  <span
                    style={{
                      fontWeight: "bold",
                      borderColor: "#FF8C00",
                      fontSize: "23px",
                      color: "#cf1322",
                      margin: "20px",
                    }}
                  >
                    1000$
                  </span>
                  <Button
                    type="primary"
                    onClick={scrollToTourSection}
                    style={{
                      backgroundColor: "#F4A460",
                      borderColor: "#FF8C00",
                      fontSize: "14px",
                      alignSelf: "start",
                      margin: "0px",
                    }}
                  >
                    Book Now
                  </Button>
                </Card>

                <Card
                  style={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    margin: "5px",
                  }}
                >
                  <Badge.Ribbon text="Trustworthy Information" color="green">
                    <Card.Meta
                      title="Tour"
                      description={
                        <>
                          <div>
                            <Rate disabled defaultValue={7} />
                            <br />
                            <span>
                              Top destination: Highly rated by guests (9.9
                              points)
                            </span>
                          </div>
                          <div>
                            <Badge
                              status="processing"
                              text="Free private parking inside the premises"
                            />
                          </div>
                        </>
                      }
                    />
                  </Badge.Ribbon>
                  <div style={{ marginTop: "16px" }}>
                    Guests say that the description and images of this property
                    are very accurate.
                  </div>
                </Card>
              </div>

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
                  <strong>Customer Support</strong>
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
                  Want a callback?
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
            <Card title="Shared Tour - Departing from Phu Quoc">
              <Row gutter={16}>
                <Col span={24}>
                  <Button
                    type="primary"
                    icon={<CalendarOutlined />}
                    onClick={handleCalendarButtonClick}
                    style={{
                      marginBottom: 16,
                      borderRadius: "8px",
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: "Blue",
                    }}
                  >
                    View Calendar
                  </Button>
                  <Modal
                    title="Calendar"
                    visible={isCalendarVisible}
                    onCancel={handleCloseCalendarModal}
                    footer={null}
                    width={800}
                  >
                    <Calendar fullscreen={false} />
                  </Modal>

                  <Content style={{ padding: " px, 100px" }}>
                    <div className="site-layout-content"></div>
                    <div ref={tourSectionRef}>
                      <Row gutter={16}>
                        <Col span={24}>{dateSelector}</Col>
                      </Row>

                      <Row>
                        <Col span={24}>
                          {selectedDate && (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                backgroundColor: "#fff",
                                padding: "20px",
                                borderRadius: "5px",
                                margin: "20px",
                              }}
                            >
                              <div style={{ maxWidth: "80%" }}>
                                <Title
                                  level={3}
                                  style={{ color: "#330099", margin: 0 }}
                                >
                                  {tourPrice[selectedDate]} Shared tour for up
                                  to 40 guests - Departure from HCMC | Vietjet
                                  Air Flight
                                </Title>
                                <Text style={{ color: "#D3D3D3" }}>
                                  Price for {selectedDate}
                                </Text>
                                <Row
                                  gutter={16}
                                  style={{
                                    backgroundColor: "#fff",
                                    padding: "24px",
                                    borderRadius: "8px",

                                    marginBottom: "20px",
                                  }}
                                >
                                  <Col span={24}>
                                    <div style={{ marginBottom: "16px" }}>
                                      <Title level={4}>Adults</Title>
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                          alignItems: "baseline",
                                          marginBottom: "9px",
                                        }}
                                      >
                                        <Text
                                          style={{
                                            fontSize: "12px",
                                            color: "#B0B0B0",
                                            fontWeight: "500",
                                          }}
                                        >
                                          ${adultPrice.toLocaleString("en-US")}
                                        </Text>
                                      </div>
                                      <InputNumber
                                        min={0}
                                        value={adultCount}
                                        onChange={setAdultCount}
                                        style={{
                                          display: "block",
                                          marginTop: "8px",
                                        }}
                                      />
                                    </div>
                                    <Text
                                      style={{
                                        fontSize: "16px",
                                        color: "#333",
                                        fontWeight: "500",
                                      }}
                                    >
                                      Tour Guide
                                    </Text>
                                    <Input
                                      placeholder="Select Tour Guide"
                                      value={tourGuide}
                                      onChange={(e) =>
                                        setTourGuide(e.target.value)
                                      }
                                    />
                                    <div
                                      style={{
                                        borderTop: "1px solid #e8e8e8",
                                        paddingTop: "24px",
                                        marginTop: "24px",
                                      }}
                                    >
                                      <Title level={4}>Total Price</Title>
                                      <Text
                                        style={{
                                          fontSize: "20px",
                                          color: "#cf1322",
                                          fontWeight: "600",
                                        }}
                                      >
                                        {getTotalPrice()}
                                      </Text>
                                    </div>

                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                      }}
                                    >
                                      <Button
                                        type="primary"
                                        className="booking-button"
                                        style={{
                                          backgroundColor: "#FF8C00",
                                          marginTop: "10px",
                                        }}
                                        onClick={handleBookTour}
                                      >
                                        Book Tour Now
                                      </Button>
                                    </div>
                                  </Col>
                                </Row>
                              </div>
                            </div>
                          )}
                        </Col>
                      </Row>
                    </div>
                  </Content>
                </Col>
              </Row>
            </Card>
          </div>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>©2024 by Travel Agency</Footer>
    </Layout>
  );
};

export default BookingPage;
