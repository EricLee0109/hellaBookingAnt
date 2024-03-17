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
  Image,
  Select,
  Form,
  Skeleton,
  Spin,
} from "antd";
import {
  EnvironmentFilled,
  CalendarOutlined,
  CarTwoTone,
  FireTwoTone,
  LeftOutlined,
  RightOutlined,
  EnvironmentOutlined,
  CarFilled,
  CarOutlined,
  StarOutlined,
  ClockCircleOutlined,
  KeyOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../api/axios";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import Footer from "../footer/Footer";

const { Content } = Layout;
const { Title, Text } = Typography;

const TourDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const [selectedTour, setSelectedTour] = useState(null);
  const [locationInToursData, setLocationInToursData] = useState([]);
  const [tourDetailData, setTourDetailData] = useState({});
  const [vehicleTypeData, setVehicleTypeData] = useState([]);
  const [locationActivitiesData, setLocationActivitiesData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [tourGuidesData, setTourGuidesData] = useState([]);
  const [tourGuide, setTourGuide] = useState("");
  const TOURS_URL = "/tours";
  const LOCATION_IN_TOUR_URL = "/tours/locations";
  const VEHICLES_URL = "/vehicles";
  const LOCATION_ACTIVITIES_URL = "/locations/activities";
  const TOURGUIDE_URL = "/tourguides";
  const USER_URL = "/users";
  const userAuth = useAuthUser();
  const userId = userAuth?.id;
  const [loading, setLoading] = useState(false);

  const TRIP_URL = "/trips";
  //generate dates
  const [selectedDateApi, setselectedDateApi] = useState("");
  const [selectedDateUi, setselectedDateUi] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);
  const displayCount = 5;

  const [formTrip, setFormTrip] = useState({
    tourId: "",
    totalCustomer: "",
    startDate: "",
    endDate: "",
    status: true,
    tourGuideId: "",
  });

  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const adultPrice = 1000;
  const childPrice = 0;

  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const tourSectionRef = useRef(null);

  const scrollToTourSection = () => {
    tourSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  console.log("tourId Param line 54 is: ", id);

  const carouselImages = [
    [
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgd_6dVxQJShOe-IX58LpZtPyDuSuN6OIZrrNdtwxEFo2fGIZvLfJyGtZcTTXo9qKxFwSVD2sCaZNhq7pgRRnJ0BGXd6jkKmUey17TrK2IWp0n-YHwZiSnXXA-1vbZRtypUvaFq9pvt93mH/s1600/Anh-bia-phong-canh-thien-nhien-+(12).jpg",
      "https://i.pinimg.com/564x/c8/2c/cd/c82ccddacbdfdc0484536b82cf2374c2.jpg",
      "https://res.klook.com/image/upload/fl_lossy.progressive,w_800,c_fill,q_85/destination/lbnwgbgs4eqnzlvozlql.jpg",
      "https://eholiday.vn/wp-content/uploads/2021/01/8-ly-do-ban-nen-den-ha-noi-1-lan-trong-doi-4.jpg",
    ],
  ];
  <Input
    placeholder="Tour Guide"
    value={tourGuide}
    onChange={(e) => setTourGuide(e.target.value)}
  />;

  // const handleTourPriceChange = (value) => {
  //   setTourPrice({ ...tourPrice, [selectedDateOnUi]: value });
  // };

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
  // useEffect(() => {
  //   const updateBoxPosition = () => {
  //     const floatingBox = document.getElementById("floating-box");
  //     if (window.innerWidth < 992) {
  //       floatingBox.style.display = "none";
  //     } else {
  //       floatingBox.style.display = "block";
  //     }
  //   };

  //   window.addEventListener("resize", updateBoxPosition);

  //   return () => {
  //     window.removeEventListener("resize", updateBoxPosition);
  //   };
  // }, []);
  // const dates = [
  //   { day: "Thu 2", date: "11 thg 3", fullDate: "2024-03-11" },
  //   { day: "Thu 3", date: "12 thg 3", fullDate: "2024-03-12" },
  //   { day: "Thu 4", date: "13 thg 3", fullDate: "2024-03-13" },
  //   { day: "Thu 5", date: "14 thg 3", fullDate: "2024-03-14" },
  //   { day: "Thu 6", date: "15 thg 3", fullDate: "2024-03-15" },
  //   { day: "Thu 7", date: "16 thg 3", fullDate: "2024-03-16" },
  //   { day: "Thu CN", date: "17 thg 3", fullDate: "2024-03-17" },
  //   { day: "Thu 2", date: "18 thg 3", fullDate: "2024-03-18" },
  //   { day: "Thu 3", date: "19 thg 3", fullDate: "2024-03-19" },
  //   { day: "Thu 4", date: "20 thg 3", fullDate: "2024-03-20" },
  // ];

  const datesOnUiAndApi = () => {
    const uiDates = [];
    const backendDates = [];
    for (let i = 1; i <= 20; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const formattedDate = date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
      uiDates.push(formattedDate);
      backendDates.push(date.toISOString());
    }
    return { uiDates, backendDates };
  };
  // datesOnApi().map((date) => console.log(date, "dateGenerate"));
  // datesOnUiAndApi().map((date) => console.log(date, "datesOnUiAndApi"));
  const { uiDates, backendDates } = datesOnUiAndApi();
  console.log(uiDates, "uiDates");
  console.log(backendDates, "backendDates");

  const locationInTourDetailData = locationInToursData.find(
    (location) => location.tourId === tourDetailData.id
  );

  //All data in this tour
  const joinedLocationInTourDetailData = {
    ...locationInTourDetailData,
    ...tourDetailData,
  };

  //vehicle in this tour
  const vehicleLocationInTourDetailData = vehicleTypeData.find(
    (vehicle) => vehicle.id === joinedLocationInTourDetailData.vehicleTypeId
  );
  console.log(
    vehicleLocationInTourDetailData,
    "joinedLocationInTourVehicleDetailDataaa"
  );

  //Location activities in this tour
  const locationActivitiesInTourDetailData = locationActivitiesData.filter(
    (activities) =>
      joinedLocationInTourDetailData.locationId === activities.locationId
  );
  console.log(
    locationActivitiesInTourDetailData,
    "locationActivitiesDetailDataaa"
  );

  // Filter all locationInTours that include in Tours data
  const joinedLocationInTourDetail = locationInToursData.map((item) => {
    if (item.tourId === tourDetailData.id) {
      return { ...item, ...tourDetailData };
    } else {
      return null;
    }
  });
  console.log(joinedLocationInTourDetail, "joinedLocationTourDetaileNewww");

  const getTourDuration = () => {
    if (joinedLocationInTourDetailData.duration === undefined) return 0;
    return Number(joinedLocationInTourDetailData.duration.slice(0, 2));
  };

  // const endDate = joinedLocationInTourDetailData?.duration.slice(0, 2);
  const endTourDate = () => {
    if (!selectedDateApi) return null;
    const startTour = new Date(selectedDateApi);
    const endTour = new Date(startTour.getTime());
    endTour.setDate(startTour.getDate() + getTourDuration());
    return endTour.toISOString();
  };

  console.log(endTourDate(), "endTourDateeeee");

  const getTotalPrice = () => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(joinedLocationInTourDetailData.price * adultCount);
  };

  const tourPrice = () => {
    return new Intl.NumberFormat("vi-VN", {
      tyle: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(joinedLocationInTourDetailData.price);
  };

  const currentDates = uiDates.slice(currentIndex, currentIndex + displayCount);

  const changeDateSet = (direction) => {
    const newIndex =
      direction === "left"
        ? currentIndex - displayCount
        : currentIndex + displayCount;
    if (newIndex >= 0 && newIndex < datesOnUiAndApi().length) {
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
            className={`date-item ${selectedDateUi === date ? "selected" : ""}`}
            onClick={() => {
              setselectedDateUi(date);
              setselectedDateApi(backendDates[index]);
            }}
          >
            {date.slice(0, 3)}
            <br />
            {date.slice(4)}
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
  console.log(selectedDateUi, "selectedDateUiiii");
  console.log(selectedDateApi, "selectedDateApiiiii");

  // console.log(locationInTourDetailData, "findLocationInTourDetail");
  // console.log(tourDetailData, "tourDetailData");
  // console.log(vehicleTypeData, "vehicleTypeData");
  // console.log(tourGuidesData, "tourGuidesData");

  // const locationAndActivitiesInTourDetailData = locationActivitiesInTourDetailData.filter()

  // const { vehicleImg: image, ...rest } = vehicleLocationInTourDetailData;
  // const joinedVehicleLocationInTourDetailData = {
  //   ...locationInTourDetailData,
  //   ...tourDetailData,
  //   ...rest,
  //   image,
  // };
  // console.log(
  //   joinedVehicleLocationInTourDetailData,
  //   "joinedVehicleLocationInTourDetailDataaa"
  // );

  // useEffect(() => {
  //   form.setFieldsValue({
  //     tourId: joinedLocationInTourDetailData.tourId,
  //     totalCustomer: getTotalPrice(),
  //     startDate: "12-03-2024",
  //     endDate: "14-03-2024",
  //     status: true,
  //     tourGuideId: "",
  //   });
  // }, [joinedLocationInTourDetailData]);

  const handleFinish = (value) => {
    console.log(value, "valueee");
    setLoading(true);
    axios
      .post(TRIP_URL, {
        tourId: joinedLocationInTourDetailData.tourId,
        totalCustomer: value.totalCustomer,
        startDate: selectedDateApi,
        endDate: endTourDate(),
        status: true,
        tourGuideId: value.tourGuide,
      })
      .then((res) => {
        userData && userData.roleId === 0
          ? toast("Pay your bills!")
          : userData.roleId === 1
          ? toast.error("Tour Guide can not booking")
          : toast.error("Please login to continue");
        console.log(res.data.data, "Trip Response");
        const tripId = res?.data.data.id;
        navigate(
          userData && userData.roleId === 0
            ? `/payment?tripId=${tripId}&tourId=${
                joinedLocationInTourDetailData.tourId
              }&totalCustomer=${
                value.totalCustomer
              }&startDate=${selectedDateApi}&endDate=${endTourDate()}`
            : !userData
            ? "/login"
            : userData.roleId === 1 && "/"
        );
      })
      .catch((err) => {
        toast.error("Booking failed!");
        console.log(err, "err HandleFinishhh");
      });
  };

  //
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const requests = [
          axios.get(LOCATION_IN_TOUR_URL),
          axios.get(TOURS_URL + `/${id}`),
          axios.get(VEHICLES_URL),
          axios.get(LOCATION_ACTIVITIES_URL), //how to get by Id?
          axios.get(TOURGUIDE_URL),
        ];

        if (userId) {
          requests.push(axios.get(USER_URL + `/${userId}`));
        }
        const [
          locationInToursRes,
          tourDetailRes,
          vehicleTypeRes,
          locationActivitiesRes,
          tourGuidesRes,
          userRes,
        ] = await Promise.all(requests);
        // setToursData(toursResponse.data.data);
        setLocationInToursData(locationInToursRes.data.data);
        setTourDetailData(tourDetailRes.data.data);
        setVehicleTypeData(vehicleTypeRes.data.data);
        setLocationActivitiesData(locationActivitiesRes.data.data);
        setTourGuidesData(tourGuidesRes.data.data);
        if (userRes) {
          setUserData(userRes.data.data);
        } else {
          setUserData(null);
        }
        setLoading(false);
        // console.log(vehicleTypeData, "tourDetailNeeeeee");
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);
  return (
    <Layout className="landing-page">
      {loading ? (
        <Skeleton title="hello" active />
      ) : (
        <>
          <Content style={{ padding: "0 100px" }}>
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
                            backgroundColor: "rgba(0, 30, 100, 0.9)",
                            padding: "10px",
                            borderRadius: "10px",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <Typography.Title
                            level={2}
                            style={{ color: "#feffee" }}
                          >
                            Tour - {joinedLocationInTourDetailData.tourName}
                            <div>
                              <Typography.Text style={{ color: "#feffee" }}>
                                <EnvironmentOutlined />
                                &nbsp; Tour - Location Name - Location Address
                              </Typography.Text>
                              <div>
                                <Typography.Text style={{ color: "#feffee" }}>
                                  <ClockCircleOutlined />
                                  &nbsp; Duration -{" "}
                                  {joinedLocationInTourDetailData.duration}
                                </Typography.Text>
                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                <Typography.Text style={{ color: "#feffee" }}>
                                  <CarOutlined />
                                  &nbsp; Vehicle -{" "}
                                  {vehicleLocationInTourDetailData?.vehicleName}
                                </Typography.Text>
                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                <Typography.Text style={{ color: "#feffee" }}>
                                  <StarOutlined />
                                  &nbsp; Capacity -{" "}
                                  {vehicleLocationInTourDetailData?.capacity}
                                </Typography.Text>
                              </div>
                            </div>
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
            <div
              style={{ padding: "55px", maxWidth: "1700px", margin: "0 auto" }}
            >
              <Row gutter={0}>
                <Col span={18}>
                  <Card style={{ marginBottom: "px" }}>
                    <ul className="horizontal-list">
                      <ul style={{ display: "flex", listStyleType: "none" }}>
                        <li style={{ marginRight: "100px" }}>
                          <CarTwoTone /> Transportation service:{" "}
                          {vehicleLocationInTourDetailData?.vehicleName}
                        </li>
                        <li style={{ marginRight: "90px" }}>
                          <FireTwoTone /> Tour type:{" "}
                          {joinedLocationInTourDetailData.tourType}
                        </li>
                      </ul>
                    </ul>
                    <Title level={4}>Tour Information</Title>
                    <Rate disabled defaultValue={4.5} />
                    <Text> 9.2 Great | From 34 reviews </Text>
                    <br />
                    <br />
                    {locationActivitiesInTourDetailData &&
                      locationActivitiesInTourDetailData.map((activity, i) => (
                        <div
                          style={{
                            border: "1px solid #1e1e1e",
                            margin: "10px",
                          }}
                          key={i.toString()}
                        >
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
                              Activity: {activity.activityName}
                            </Text>
                          </div>
                          <div className="schedule">
                            <div className="schedule-item">
                              <div className="time">
                                Time: {activity.activityDuration}
                              </div>
                              <div>
                                Description: {activity.activityDescription}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
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
                        {tourPrice()} VND
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
                      <Badge.Ribbon
                        text="Trustworthy Information"
                        color="green"
                      >
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
                        Guests say that the description and images of this
                        property are very accurate.
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
                      <a href="mailto:info@saigontourist.net">
                        Hella@email.net
                      </a>
                    </div>
                    <Button
                      type="primary"
                      style={{
                        backgroundColor: "#FF8C00",
                        borderColor: "#FF8C00",
                      }}
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
                              {selectedDateUi && (
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
                                      {tourPrice[selectedDateUi]} Shared tour
                                      for up to 40 guests - Departure from HCMC
                                      | Vietjet Air Flight
                                    </Title>
                                    <Text style={{ color: "#D3D3D3" }}>
                                      Price for {selectedDateUi}
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
                                        <Form
                                          onFinish={handleFinish}
                                          initialValues={{ totalCustomer: 1 }}
                                        >
                                          <div style={{ marginBottom: "16px" }}>
                                            <Form.Item level={4}>
                                              Adults
                                            </Form.Item>
                                            <div
                                              style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "baseline",
                                                marginBottom: "9px",
                                              }}
                                            >
                                              <Form.Item
                                                style={{
                                                  fontSize: "12px",
                                                  color: "#B0B0B0",
                                                  fontWeight: "500",
                                                }}
                                              >
                                                {
                                                  joinedLocationInTourDetailData.price
                                                }{" "}
                                                VND/person
                                              </Form.Item>
                                            </div>
                                            <Form.Item name="totalCustomer">
                                              <InputNumber
                                                min={1}
                                                max={
                                                  vehicleLocationInTourDetailData?.capacity
                                                }
                                                onChange={setAdultCount}
                                                defaultValue={1}
                                              />
                                            </Form.Item>
                                          </div>
                                          <Text
                                            style={{
                                              fontSize: "16px",
                                              color: "#333",
                                              fontWeight: "500",
                                            }}
                                          >
                                            <KeyOutlined /> &nbsp; Tour Guide
                                          </Text>
                                          <Form.Item
                                            name="tourGuide"
                                            rules={[
                                              {
                                                required: true,
                                                message:
                                                  "Select your Tour Guide first!",
                                              },
                                            ]}
                                          >
                                            <Select
                                              // name={tourGuide.userId.fullName}
                                              placeholder="Please select your Tour Guide"
                                            >
                                              {tourGuidesData.map(
                                                (tourGuide) =>
                                                  tourGuide.userId.status ===
                                                    true && (
                                                    <Select.Option
                                                      key={tourGuide._id}
                                                      value={tourGuide._id}
                                                    >
                                                      {
                                                        tourGuide.userId
                                                          ?.fullName
                                                      }
                                                    </Select.Option>
                                                  )
                                              )}
                                            </Select>
                                          </Form.Item>

                                          <div
                                            style={{
                                              borderTop: "1px solid #e8e8e8",
                                              paddingTop: "24px",
                                              marginTop: "24px",
                                            }}
                                          >
                                            <Form.Item level={4}>
                                              Total Price
                                            </Form.Item>
                                            <Form.Item
                                              name="totalPrice"
                                              style={{
                                                fontSize: "20px",
                                                color: "#cf1322",
                                                fontWeight: "600",
                                              }}
                                            >
                                              {getTotalPrice()}
                                            </Form.Item>
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
                                              htmlType="submit"
                                              onClick={() => {
                                                !userData && navigate("/login");
                                                toast.error(
                                                  "Your must login first!"
                                                );
                                              }}
                                            >
                                              {loading ? (
                                                <Spin
                                                  indicator={
                                                    <LoadingOutlined
                                                      style={{ fontSize: 24 }}
                                                    />
                                                  }
                                                />
                                              ) : (
                                                "Book Tour Now"
                                              )}
                                            </Button>
                                          </div>
                                        </Form>
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
          <Footer />
        </>
      )}
    </Layout>
  );
};

export default TourDetail;
