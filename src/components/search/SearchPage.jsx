import React from "react";
import { Card, Tag, Typography, Rate, Badge, Input } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./SearchPage.css";

const { Title, Text } = Typography;
const { Search } = Input;
const SearchPage = () => {
  const cardInfo = {
    image:
      "https://i.pinimg.com/564x/df/b8/a9/dfb8a99bf3efd4b8be5732a33096ef10.jpg",
    title: "Ha Noi",
    location: "Ha Noi, Viet Nam",
    rating: 4.5,
    reviewCount: 2996,
    description:
      "Hà Nội, thủ đô của Việt Nam, nổi tiếng với kiến trúc trăm tuổi và nền văn hóa phong phú với sự ảnh hưởng của khu vực ",
    tags: [
      "Mua Vé Trước",
      "Để Xuất Trang Phục Thể Thao",
      "Hoạt Động Giải Trí",
      "Sức Khỏe",
    ],
    link: "http://localhost:3000/",
  };

  const cardInfo1 = {
    image:
      "https://i.pinimg.com/236x/75/0b/42/750b42778afb48223dca3644227d731a.jpg",
    title: "Da Nang",
    location: "Da Nang, Viet Nam",
    rating: 4.5,
    reviewCount: 2296,
    description:
      "Đà Nẵng là một trong năm thành phố trực thuộc trung ương của Việt Nam, nằm tại vùng Duyên hải Nam Trung Bộ. Đây là thành.",
    tags: [
      "Mua Vé Trước",
      "Để Xuất Trang Phục Thể Thao",
      "Hoạt Động Giải Trí",
      "Sức Khỏe",
    ],
    link: "http://localhost:3000/danang",
  };

  const cardInfo2 = {
    image:
      "https://i.pinimg.com/564x/df/b8/a9/dfb8a99bf3efd4b8be5732a33096ef10.jpg",
    title: "Nha Trang",
    location: "Nha Trang, Viet Nam",
    rating: 4.5,
    reviewCount: 2296,
    description:
      "Nha Trang là một thành phố ven biển và là trung tâm chính trị, kinh tế, văn hóa, khoa học kỹ thuật và du lịch của tỉnh Khánh Hòa, Việt Nam..",
    tags: [
      "Mua Vé Trước",
      "Để Xuất Trang Phục Thể Thao",
      "Hoạt Động Giải Trí",
      "Sức Khỏe",
    ],
    link: "http://localhost:3000/nha-trang",
  };
  const cardInfo3 = {
    image:
      "https://i.pinimg.com/236x/0d/ca/40/0dca4057f75d522689bc6eaed5890f9d.jpg",
    title: "Phu Quoc",
    location: "Phu Quoc, Viet Nam",
    rating: 4.5,
    reviewCount: 2296,
    description:
      "Phú Quốc là một thành phố đảo trực thuộc tỉnh Kiên Giang, Việt Nam. Đảo Phú Quốc cùng các đảo nhỏ lân cận",
    tags: [
      "Mua Vé Trước",
      "Để Xuất Trang Phục Thể Thao",
      "Hoạt Động Giải Trí",
      "Sức Khỏe",
    ],
    link: "http://localhost:3000/phu-quoc",
  };

  const cardInfo4 = {
    image:
      "https://i.pinimg.com/564x/ea/57/6f/ea576fc3b0f82c7c660f7896023a67c8.jpg",
    title: "Sapa",
    location: "Sapa, Viet Nam",
    rating: 4.5,
    reviewCount: 2296,
    description:
      "Sa Pa là một thị trấn thuộc dãy núi Hoàng Liên Sơn phía tây bắc Việt Nam. Là một cơ sở đi bộ xuyên rừng nổi tiếng, nơi đây nhìn ra những cánh đồng lúa bậc thang của Thung lũng Mường Hoa ",
    tags: [
      "Mua Vé Trước",
      "Để Xuất Trang Phục Thể Thao",
      "Hoạt Động Giải Trí",
      "Sức Khỏe",
    ],
    link: "http://localhost:3000/sapa",
  };

  const cardInfo5 = {
    image:
      "https://i.pinimg.com/236x/d4/2c/16/d42c16aad952ef8416073011a0aa0fb9.jpg",
    title: "Vung Tau",
    location: "Vung Tau, Viet Nam",
    rating: 4.5,
    reviewCount: 2296,
    description:
      "Vũng Tàu là một thành phố thuộc tỉnh Bà Rịa – Vũng Tàu, vùng Đông Nam Bộ, Việt Nam. Đây là trung tâm kinh tế, tài chính, văn hóa, du lịch, và là một trong những trung tâm",
    tags: [
      "Mua Vé Trước",
      "Để Xuất Trang Phục Thể Thao",
      "Hoạt Động Giải Trí",
      "Sức Khỏe",
    ],
    link: "http://localhost:3000/vung-tau",
  };
  const cardInfo6 = {
    image:
      "https://i.pinimg.com/564x/a0/de/fc/a0defccddc35233efe6e5a5b3ccbfe23.jpg",
    title: "Hue",
    location: "Hue, Viet Nam",
    rating: 4.5,
    reviewCount: 2296,
    description:
      "Huế là thành phố tỉnh lỵ của tỉnh Thừa Thiên Huế, Việt Nam. Huế từng là kinh đô của Việt Nam dưới triều Tây Sơn và triều Nguyễn. Hiện nay, thành phố là một trong những trung tâm về văn hóa – du",
    tags: [
      "Mua Vé Trước",
      "Để Xuất Trang Phục Thể Thao",
      "Hoạt Động Giải Trí",
      "Sức Khỏe",
    ],
    link: "http://localhost:3000/Hue",
  };
  const cardInfo7 = {
    image:
      "https://i.pinimg.com/236x/84/19/4f/84194f9bff226da50d70f279a55d78f4.jpg",
    title: "Da Lat",
    location: "Da Lat, Viet Nam",
    rating: 4.5,
    reviewCount: 2296,
    description:
      "Đà Lạt là thành phố tỉnh lỵ trực thuộc tỉnh Lâm Đồng, nằm trên cao nguyên Lâm Viên, thuộc vùng Tây Nguyên, Việt Nam. Từ xa xưa, vùng đất này vốn là địa bàn cư trú của những cư dân người Lạch",
    tags: [
      "Mua Vé Trước",
      "Để Xuất Trang Phục Thể Thao",
      "Hoạt Động Giải Trí",
      "Sức Khỏe",
    ],
    link: "http://localhost:3000/dalat",
  };
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
        <Link to={cardInfo.link}>
          <Card
            hoverable
            style={{ overflow: "hidden" }}
            cover={<img alt={cardInfo.title} src={cardInfo.image} />}
          >
            <div style={{ padding: "20px" }}>
              <Title level={4}>{cardInfo.title}</Title>
              <Text type="secondary">{cardInfo.location}</Text>
              <Rate allowHalf disabled value={cardInfo.rating} />
              <Text>{` ${cardInfo.reviewCount} đánh giá`}</Text>
              <Text>{cardInfo.description}</Text>
              {cardInfo.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
            <Badge.Ribbon text="2024" color="yellow">
              <HeartOutlined style={{ color: "white", fontSize: 16 }} />
            </Badge.Ribbon>
          </Card>
        </Link>
        <Link to={cardInfo1.link}>
          {/* Use Link to wrap the Card */}
          <Card
            hoverable
            style={{ overflow: "hidden" }}
            cover={<img alt={cardInfo1.title} src={cardInfo1.image} />}
          >
            <div style={{ padding: "20px" }}>
              {/* Content area styling */}
              <Title level={4}>{cardInfo1.title}</Title>
              <Text type="secondary">{cardInfo1.location}</Text>
              <Rate allowHalf disabled value={cardInfo1.rating} />
              <Text>{` ${cardInfo1.reviewCount} đánh giá`}</Text>
              <Text>{cardInfo1.description}</Text>
              {cardInfo1.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
            <Badge.Ribbon text="2024" color="yellow">
              <HeartOutlined style={{ color: "white", fontSize: 16 }} />
            </Badge.Ribbon>
          </Card>
        </Link>
        <Link to={cardInfo2.link}>
          <Card
            hoverable
            style={{ overflow: "hidden" }}
            cover={<img alt={cardInfo2.title} src={cardInfo2.image} />}
          >
            <div style={{ padding: "20px" }}>
              {/* Content area styling */}
              <Title level={4}>{cardInfo2.title}</Title>
              <Text type="secondary">{cardInfo2.location}</Text>
              <Rate allowHalf disabled value={cardInfo2.rating} />
              <Text>{` ${cardInfo2.reviewCount} đánh giá`}</Text>
              <Text>{cardInfo2.description}</Text>
              {cardInfo2.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
            <Badge.Ribbon text="2024" color="yellow">
              <HeartOutlined style={{ color: "white", fontSize: 16 }} />
            </Badge.Ribbon>
          </Card>
        </Link>
        <Link to={cardInfo3.link}>
          <Card
            hoverable
            style={{ overflow: "hidden" }}
            cover={<img alt={cardInfo3.title} src={cardInfo3.image} />}
          >
            <div style={{ padding: "20px" }}>
              <Title level={4}>{cardInfo3.title}</Title>
              <Text type="secondary">{cardInfo3.location}</Text>
              <Rate allowHalf disabled value={cardInfo3.rating} />
              <Text>{` ${cardInfo3.reviewCount} đánh giá`}</Text>
              <Text>{cardInfo3.description}</Text>
              {cardInfo3.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
            <Badge.Ribbon text="2024" color="yellow">
              <HeartOutlined style={{ color: "white", fontSize: 16 }} />
            </Badge.Ribbon>
          </Card>
        </Link>

        <Link to={cardInfo4.link}>
          <Card
            hoverable
            style={{ overflow: "hidden" }}
            cover={<img alt={cardInfo4.title} src={cardInfo4.image} />}
          >
            <div style={{ padding: "20px" }}>
              <Title level={4}>{cardInfo4.title}</Title>
              <Text type="secondary">{cardInfo4.location}</Text>
              <Rate allowHalf disabled value={cardInfo4.rating} />
              <Text>{` ${cardInfo4.reviewCount} đánh giá`}</Text>
              <Text>{cardInfo4.description}</Text>
              {cardInfo4.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
            <Badge.Ribbon text="2024" color="yellow">
              <HeartOutlined style={{ color: "white", fontSize: 16 }} />
            </Badge.Ribbon>
          </Card>
        </Link>

        <Link to={cardInfo5.link}>
          <Card
            hoverable
            style={{ overflow: "hidden" }}
            cover={<img alt={cardInfo5.title} src={cardInfo5.image} />}
          >
            <div style={{ padding: "20px" }}>
              <Title level={4}>{cardInfo5.title}</Title>
              <Text type="secondary">{cardInfo5.location}</Text>
              <Rate allowHalf disabled value={cardInfo5.rating} />
              <Text>{` ${cardInfo5.reviewCount} đánh giá`}</Text>
              <Text>{cardInfo5.description}</Text>
              {cardInfo5.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
            <Badge.Ribbon text="2024" color="yellow">
              <HeartOutlined style={{ color: "white", fontSize: 16 }} />
            </Badge.Ribbon>
          </Card>
        </Link>

        <Link to={cardInfo6.link}>
          <Card
            hoverable
            style={{ overflow: "hidden" }}
            cover={<img alt={cardInfo6.title} src={cardInfo6.image} />}
          >
            <div style={{ padding: "20px" }}>
              <Title level={4}>{cardInfo6.title}</Title>
              <Text type="secondary">{cardInfo6.location}</Text>
              <Rate allowHalf disabled value={cardInfo6.rating} />
              <Text>{` ${cardInfo6.reviewCount} đánh giá`}</Text>
              <Text>{cardInfo6.description}</Text>
              {cardInfo6.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
            <Badge.Ribbon text="2024" color="yellow">
              <HeartOutlined style={{ color: "white", fontSize: 16 }} />
            </Badge.Ribbon>
          </Card>
        </Link>
        <Link to={cardInfo7.link}>
          <Card
            hoverable
            style={{ overflow: "hidden" }}
            cover={<img alt={cardInfo7.title} src={cardInfo7.image} />}
          >
            <div style={{ padding: "20px" }}>
              <Title level={4}>{cardInfo7.title}</Title>
              <Text type="secondary">{cardInfo7.location}</Text>
              <Rate allowHalf disabled value={cardInfo7.rating} />
              <Text>{` ${cardInfo7.reviewCount} đánh giá`}</Text>
              <Text>{cardInfo7.description}</Text>
              {cardInfo7.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
            <Badge.Ribbon text="2024" color="yellow">
              <HeartOutlined style={{ color: "white", fontSize: 16 }} />
            </Badge.Ribbon>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default SearchPage;
