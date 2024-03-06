import { Button, Card, Col, Flex, Image, Modal, Row, Typography } from "antd";
import landmark81 from "../../../img/plan_landmark81.jpg";
import sunPlaza from "../../../img/plan_sunPlaza.jpg";
import QueueAnim from "rc-queue-anim";
import { OverPack } from "rc-scroll-anim";
import { page1 } from "../../data";
import { useEffect, useState } from "react";
import axios from "../../../api/axios";
import {
  unstable_HistoryRouter,
  useLocation,
  useNavigate,
} from "react-router-dom";

function Tours() {
  const [toursData, setToursData] = useState([]);
  const [locationInToursData, setLocationInToursData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);
  const { Meta } = Card;
  const TOURS_URL = "/tours";
  const LOCATION_IN_TOUR_URL = "/tours/locations";
  const joinedData = []; // Join the tour and locationInTours data
  const joinedLocationTour = []; // Join the locationInTour and joinedData
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [toursResponse, locationInToursResponse] = await Promise.all([
          axios.get(TOURS_URL),
          axios.get(LOCATION_IN_TOUR_URL),
        ]);
        setToursData(toursResponse.data.data);
        setLocationInToursData(locationInToursResponse.data.data);
        console.log(locationInToursResponse.data, "locationInToursData");
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleCardClick = (tour) => {
    setVisible(!visible);
    setSelectedTour(tour);
    navigate(`/tourDetail/${tour.tourId}`);
    console.log("tourID line 48: ", tour.tourId);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = () => {
    setVisible(true);
  };

  // Join the tour and locationInTours data
  for (const tour of toursData) {
    const locationInTour = locationInToursData.find(
      (locationInTour) => locationInTour.tourId === tour.id
    );
    // const locations = locationInToursData.filter(
    //   (locationInTour) => locationInTour.tourId === tour.id
    // );

    // const joinedObject = {
    //   ...tour,
    //   ...locationInTour,
    // }; // if we use that way, tour.id will be overrided by locationInTour.tourId

    // Rename the id property in tour to tourId
    const { id: tourId, ...restOfTour } = tour;
    const joinedObject = {
      ...restOfTour,
      tourId,
      // location: locations,
      ...locationInTour,
    }; //this way, we can keep both id and tourId (because if tour.id does not have locationInTour, it will be undefined and will not be added to the joinedObject)

    // console.log(tour, "tour");
    // console.log(locationInTour, "locationInTour");
    joinedData.push(joinedObject);
  }
  // console.log(joinedData, "joinedData");
  // console.log(locationInToursData, "locationsInTourData");
  // console.log(toursData, "toursData");
  // console.log(filteredData, "filteredData");

  for (const tour of joinedData) {
    const joinedLocationInTour = locationInToursData.filter(
      (locationInTour) => locationInTour.tourId === tour.tourId
    );
    const joinedLocationTourObject = {
      ...tour,
      locationInTour: joinedLocationInTour,
    };
    joinedLocationTour.push(joinedLocationTourObject);
  }

  // console.log(joinedLocationTour, "joinedLocationTour");

  const children = joinedData.slice(0, 4).map((tour, i) => {
    const colProps = {
      //use to responsive col
      md: tour.full ? 24 : 6,
      xs: 12,
    };
    return (
      <Col onClick={() => handleCardClick(tour)} {...colProps} key={i}>
        <Card
          hoverable
          style={{ width: 200 }}
          cover={
            <img
              alt="image"
              src={
                "https://res.cloudinary.com/dtlvihfka/image/upload/v1709136569/samples/animals/cat.jpg"
              }
            />
          }
        >
          <Meta title={tour.tourName} description={tour.tourType} />
        </Card>
      </Col>
    );
  });

  const modalChildren = () => {
    // if (locationInTour.tourId === selectedTour.tourId) {
    return (
      <div>
        <div style={{ width: 200 }}>
          <Image
            width="100%"
            src={
              "https://res.cloudinary.com/dtlvihfka/image/upload/v1709136569/samples/animals/cat.jpg"
            }
            alt="image"
          />
        </div>
        {selectedTour && (
          <div>
            <Typography.Title level={2}>
              Name:&nbsp;
              {selectedTour?.tourName}
            </Typography.Title>
            <Typography.Paragraph>
              Type:&nbsp;
              {selectedTour?.tourType}
            </Typography.Paragraph>
            <Typography.Paragraph>
              Price:&nbsp;
              {selectedTour?.price}
            </Typography.Paragraph>
            <Typography.Paragraph>
              Time:&nbsp;
              {selectedTour?.duration}
            </Typography.Paragraph>
            <Typography.Paragraph>
              Description:&nbsp;
              {selectedTour?.description}
            </Typography.Paragraph>
            <Typography.Paragraph>
              From:&nbsp;
              {selectedTour?.startCity}
            </Typography.Paragraph>
            <Typography.Paragraph>
              To:&nbsp;
              {selectedTour?.endCity}
            </Typography.Paragraph>
          </div>
        )}
        {selectedTour.tourId &&
          joinedLocationTour.map((locationInTour, i) => (
            <div key={i}>
              {selectedTour.tourId === locationInTour.tourId &&
                Array.isArray(locationInTour.locationInTour) &&
                locationInTour.locationInTour.map((location, j) => (
                  <div key={j}>
                    <Typography.Title level={3}>
                      Locations In Tour
                    </Typography.Title>
                    <Typography.Paragraph>
                      Time:&nbsp;
                      {location.duration}
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                      Description:&nbsp;
                      {location.description}
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                      From:&nbsp;
                      {location.startCity}
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                      To:&nbsp;
                      {location.endCity}
                    </Typography.Paragraph>
                  </div>
                ))}
            </div>
          ))}
      </div>

      // }
      // return null;
    );
  };

  console.log(selectedTour, "selectedTour");
  return (
    <div className="page-wrapper page1">
      <div className="page">
        <h1>Plan Your Pefect Trip</h1>
        <i />
        <Button style={{ width: 180, marginLeft: "80%" }}>
          See more places
        </Button>
        {/* <Modal onCancel={handleCancel} onOk={handleOk} open={visible}>
          {selectedTour && modalChildren()}
        </Modal> */}
        <OverPack>
          <QueueAnim key="queue" type="bottom" leaveReverse component={Row}>
            {children}
            {/** To wrap children in QueueAnim each element must have unique key in order to queueAnim coulde render base on it **/}
          </QueueAnim>
        </OverPack>
      </div>
    </div>
  );
}

export default Tours;
