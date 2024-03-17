import {
  Button,
  Card,
  Col,
  Flex,
  Image,
  Modal,
  Row,
  Skeleton,
  Typography,
} from "antd";
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
  const joinedLocationsInTourData = []; // Join the tour and locationInTours data
  const joinedLocationTour = []; // Join the locationInTour and joinedData
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
  for (const locationsInTour of locationInToursData) {
    const tours = toursData.find((tour) => tour.id === locationsInTour.tourId);

    // const joinedObject = {
    //   ...tour,
    //   ...locationInTour,
    // }; // if we use that way, tour.id will be overrided by locationInTour.tourId

    // Rename the id property in tour to tourId
    const { image: img, ...restOfTour } = tours; //destructuring the tour object and rename the image property to img to get image from tourData
    // const { ...locationInToursData } = locationsInTour;
    const joinedObject = {
      ...restOfTour,
      img,
      // location: locations,
      // ...tours,
      ...locationsInTour,
    }; //this way, we can keep both id and tourId (because if tour.id does not have locationInTour, it will be undefined and will not be added to the joinedObject)
    joinedLocationsInTourData.push(joinedObject);
  }
  // console.log(locationInToursData, "locationsInTourData");
  // console.log(toursData, "toursData");
  // console.log(filteredData, "filteredData");

  // for (const tour of joinedData) {
  //   const joinedLocationInTour = locationInToursData.filter(
  //     (locationInTour) => locationInTour.tourId === tour.tourId
  //   );
  //   const joinedLocationTourObject = {
  //     ...tour,
  //     locationInTour: joinedLocationInTour,
  //   };
  //   joinedLocationTour.push(joinedLocationTourObject);
  // }

  //Joineddata locationInTour with locations, tours
  console.log(toursData, "toursData");
  console.log(joinedLocationsInTourData, "joinedLocationsInTourData");
  const children = joinedLocationsInTourData.slice(0, 4).map((tour, i) => {
    const colProps = {
      //use to responsive col
      md: tour.full ? 24 : 6,
      xs: 12,
    };
    return (
      <Col onClick={() => handleCardClick(tour)} {...colProps} key={i}>
        <Card
          hoverable
          style={{ width: 250, height: 400, margin: 10 }}
          cover={
            <img
              style={{ width: 250, height: 300, borderRadius: 1 }}
              alt="image"
              src={tour.img}
            />
          }
        >
          <Meta title={tour.tourName} description={tour.tourType} />
        </Card>
      </Col>
    );
  });

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const [toursResponse, locationInToursResponse] = await Promise.all([
          axios.get(TOURS_URL),
          axios.get(LOCATION_IN_TOUR_URL),
        ]);
        setToursData(toursResponse.data.data);
        setLocationInToursData(locationInToursResponse.data.data);
        console.log(locationInToursResponse.data, "locationInToursData");
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  console.log(selectedTour, "selectedTour");
  return (
    <div className="page-wrapper page1">
      <div className="page">
        <h1>Plan Your Pefect Trip</h1>
        <i />
        <Button
          onClick={() => navigate("/search")}
          style={{ width: 180, marginLeft: "80%" }}
        >
          See more places
        </Button>
        {/* <Modal onCancel={handleCancel} onOk={handleOk} open={visible}>
          {selectedTour && modalChildren()}
        </Modal> */}
        <OverPack>
          <QueueAnim key="queue" type="bottom" leaveReverse component={Row}>
            {loading ? <Skeleton active /> : children}
            {/** To wrap children in QueueAnim each element must have unique key in order to queueAnim coulde render base on it **/}
          </QueueAnim>
        </OverPack>
      </div>
    </div>
  );
}

export default Tours;
