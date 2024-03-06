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
  Image,
} from "antd";
import {
  EnvironmentFilled,
  CalendarOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../api/axios";
// import "./BookingPage.css";

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

function TourDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  // const [selectedTour, setSelectedTour] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  // const [toursData, setToursData] = useState([]);
  const [locationInToursData, setLocationInToursData] = useState([]);
  const [tourDetailData, setTourDetailData] = useState({});
  const [selectedTour, setSelectedTour] = useState(null);
  const TOURS_URL = "/tours";
  const LOCATION_IN_TOUR_URL = "/tours/locations";
  const joinedData = []; // Join the tour and locationInTours data
  const joinedLocationTour = []; // Join the locationInTour and joinedData

  const carouselImages = [
    [
      "https://duongxuavilla.com/wp-content/uploads/2023/04/kinh-nghiem-du-lich-da-lat-900x473.jpg",
      "https://toigingiuvedep.vn/wp-content/uploads/2021/05/tong-hop-hinh-anh-da-lat-dep-mong-mo-lang-man-nhat.jpg",
      "https://upanh123.com/wp-content/uploads/2020/10/anh-dep-da-lat3.jpg",
      "https://media.vneconomy.vn/w800/images/upload/2023/07/06/1688465738-grasp-the-rainy-season-travel-tips-to-da-lat.jpg",
    ],
  ];

  const tourSectionRef = useRef(null);
  const scrollToTourSection = () => {
    tourSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  console.log("tourId Param line 54 is: ", id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [locationInToursRes, tourDetailRes] = await Promise.all([
          // axios.get(TOURS_URL),
          axios.get(LOCATION_IN_TOUR_URL),
          axios.get(`/tours/${id}`),
        ]);
        // setToursData(toursResponse.data.data);
        setLocationInToursData(locationInToursRes.data.data);
        setTourDetailData(tourDetailRes.data.data);
        console.log(tourDetailRes.data.data, "tourDetailNeeeeee");
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  console.log(tourDetailData.id, "idTourDetailDataaaaa");
  console.log(locationInToursData, "locationInToursDataaaaa");

  // Join the tour and locationInTours data
  const joinedLocationInTourDetail = locationInToursData.map((item) => {
    if (item.tourId === tourDetailData.id) {
      return { ...item, ...tourDetailData };
    } else {
      return null;
    }
  });

  console.log(joinedLocationInTourDetail, "joinedLocationTourDetaileNewww");

  const handleBookTour = () => {
    navigate("/booking");
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
  console.log(joinedLocationTour, "joinedLocationTour");

  return (
    <Layout className="landing-page">
      <Content style={{ padding: "50px 100px" }}>
        <div className="site-layout-content">
          <div style={{ marginTop: "70px", marginBottom: "50px" }}>
            <Carousel
              autoplay
              autoplaySpeed={4000}
              style={{ width: "92%", height: "600px", margin: "0 auto" }}
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
                      <Typography.Title level={2} style={{ color: "#fefefe" }}>
                        <EnvironmentOutlined />
                        &nbsp; {tourDetailData.tourName}
                      </Typography.Title>
                    </h1>
                  </div>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        maxWidth: "100%",
                        // border: "1px solid #ccc",
                        borderRadius: "5px",
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={imageGroup[0]}
                        alt={`Image ${index + 1}`}
                        style={{
                          width: "100%",
                          height: "350px",
                          objectFit: "cover",
                          boxShadow: "2px 1px 4px rgba(0,0,0,0.25)",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      {imageGroup.slice(1).map((imageUrl, imageIndex) => (
                        <div
                          key={imageIndex}
                          style={{
                            maxWidth: "30%",
                            borderRadius: "1px",
                            marginTop: 10,
                            // overflow: "hidden",
                          }}
                        >
                          <Image
                            src={imageUrl}
                            alt={`Image ${index + 1}.${imageIndex + 1}`}
                            style={{
                              width: "100%",
                              height: "200px",
                              objectFit: "cover",
                              boxShadow: "2px 1px 4px rgba(0,0,0,0.25)",
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
              {joinedLocationInTourDetail !== null &&
                joinedLocationInTourDetail.map((tourDetail, i) => {
                  if (tourDetail !== null) {
                    return (
                      <Card key={i.toString()} style={{ marginBottom: "0px" }}>
                        <Title level={4}>Thông tin tour</Title>
                        <Rate disabled defaultValue={4.5} />
                        <Text> 9.2 Tuyệt vời | Từ 34 đánh giá </Text>
                        <br />
                        <br />
                        <div style={{ width: "700px" }}>
                          <Text
                            strong
                            style={{
                              fontSize: "16px",
                              color: "#333",
                            }}
                          >
                            Type: {tourDetail?.tourType} <br />
                            Description: {tourDetail?.description}
                          </Text>
                          <br />
                        </div>
                        <div className="schedule">
                          <div className="schedule-item">
                            <div className="time">
                              Duration: {tourDetail?.duration}
                            </div>
                            <div className="time">
                              From: {tourDetail?.startCity}
                            </div>
                            <div className="time">
                              To: {tourDetail?.endCity}
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  } else {
                    return null;
                  }
                })}
            </Col>
            <Col span={6}>
              <Card>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Title level={3} style={{ color: "#FF8C00" }}>
                    {tourDetailData?.price} USD
                  </Title>

                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={scrollToTourSection}
                    style={{
                      backgroundColor: "#FF8C00",
                      borderColor: "#FF8C00",
                    }}
                  >
                    Đặt Tour Ngay
                  </Button>
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
                  display: window.innerWidth < 992 ? "none" : "block", // Hide on smaller screens
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
                    // visible={isCalendarVisible}
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
                      {/* {tourPrice[selectedDate]} Tour ghép cho tối đa 40 khách -
                      Khởi hành TPHCM | Bay Vietjet Air */}
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
}

export default TourDetail;
