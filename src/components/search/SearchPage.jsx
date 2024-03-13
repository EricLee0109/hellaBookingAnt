import React, { useEffect, useState } from "react";
import { Card, Tag, Typography, Rate, Badge, Input } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./SearchPage.css";
import axios from "../../api/axios";

const { Title, Text } = Typography;
const { Search } = Input;

const SearchPage = () => {
  const [toursData, setToursData] = useState([]);
  const [locationInToursData, setLocationInToursData] = useState([]);
  const TOURS_URL = "/tours";
  const LOCATION_IN_TOUR_URL = "/tours/locations";
  const joinedLocationsInTourData = [];

  for (const locationsInTour of locationInToursData) {
    const tours = toursData.find((tour) => tour.id === locationsInTour.tourId);
    const joinedObject = {
      ...tours,
      ...locationsInTour,
    }; //this way, we can keep both id and tourId (because if tour.id does not have locationInTour, it will be undefined and will not be added to the joinedObject)
    joinedLocationsInTourData.push(joinedObject);
  }
  console.log(joinedLocationsInTourData, "joinedDataaa");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [toursResponse, locationInToursResponse] = await Promise.all([
          axios.get(TOURS_URL),
          axios.get(LOCATION_IN_TOUR_URL),
        ]);
        setToursData(toursResponse.data.data);
        setLocationInToursData(locationInToursResponse.data.data);
        console.log(locationInToursResponse.data.data, "tourData");
        console.log(locationInToursResponse.data.data, "locationInToursData");
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  // const cardInfo = {
  //   image:
  //     "https://i.pinimg.com/564x/df/b8/a9/dfb8a99bf3efd4b8be5732a33096ef10.jpg",
  //   title: "Ha Noi",
  //   location: "Ha Noi, Viet Nam",
  //   rating: 4.5,
  //   reviewCount: 2996,
  //   description:
  //     "Hà Nội, thủ đô của Việt Nam, nổi tiếng với kiến trúc trăm tuổi và nền văn hóa phong phú với sự ảnh hưởng của khu vực ",
  //   tags: [
  //     "Mua Vé Trước",
  //     "Để Xuất Trang Phục Thể Thao",
  //     "Hoạt Động Giải Trí",
  //     "Sức Khỏe",
  //   ],
  //   link: "http://localhost:3000/",
  // };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Search
          placeholder="Nhập từ khóa tìm kiếm"
          enterButton="Tìm kiếm"
          size="large"
          onSearch={(value) => console.log(value)}
        />
      </div>
      <div className="horizontal-card">
        {joinedLocationsInTourData.map((tour) => (
          <Link key={tour.tourId} to={`/tours/${tour.tourId}`}>
            <Card
              hoverable
              style={{ overflow: "hidden" }}
              cover={<img alt={tour.tourName} src={tour.image} />}
            >
              <div style={{ padding: "20px" }}>
                <Title level={4}>{tour.tourName}</Title>
                <Text type="secondary">{tour.location}</Text>
                <Rate allowHalf disabled value={tour.rating} />
                <Text>{` ${tour.reviewCount} đánh giá`}</Text>
                <Text>{tour.duration}</Text>
                <Text>{tour.description}</Text>
                <Text>{tour.tourType}</Text>
                {/* {tour.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))} */}
                <Text>{tour.startCity}</Text>
                <Text>{tour.endCity}</Text>
              </div>
              <Badge.Ribbon text="2024" color="yellow">
                <HeartOutlined style={{ color: "white", fontSize: 16 }} />
              </Badge.Ribbon>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
