import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { styled, darken, alpha, lighten } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import TableCell from "@mui/material/TableCell";
import { ViewState } from "@devexpress/dx-react-scheduler";
import classNames from "clsx";
import {
  Scheduler,
  MonthView,
  Appointments,
  Toolbar,
  DateNavigator,
  AppointmentTooltip,
  Resources,
} from "@devexpress/dx-react-scheduler-material-ui";
import WbSunny from "@mui/icons-material/WbSunny";
import FilterDrama from "@mui/icons-material/FilterDrama";
import Opacity from "@mui/icons-material/Opacity";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useParams } from "react-router-dom";

export default function Schedule() {
  const PREFIX = "Demo";

  const classes = {
    cell: `${PREFIX}-cell`,
    content: `${PREFIX}-content`,
    text: `${PREFIX}-text`,
    sun: `${PREFIX}-sun`,
    cloud: `${PREFIX}-cloud`,
    rain: `${PREFIX}-rain`,
    sunBack: `${PREFIX}-sunBack`,
    cloudBack: `${PREFIX}-cloudBack`,
    rainBack: `${PREFIX}-rainBack`,
    opacity: `${PREFIX}-opacity`,
    appointment: `${PREFIX}-appointment`,
    apptContent: `${PREFIX}-apptContent`,
    flexibleSpace: `${PREFIX}-flexibleSpace`,
    flexContainer: `${PREFIX}-flexContainer`,
    tooltipContent: `${PREFIX}-tooltipContent`,
    tooltipText: `${PREFIX}-tooltipText`,
    title: `${PREFIX}-title`,
    icon: `${PREFIX}-icon`,
    circle: `${PREFIX}-circle`,
    textCenter: `${PREFIX}-textCenter`,
    dateAndTitle: `${PREFIX}-dateAndTitle`,
    titleContainer: `${PREFIX}-titleContainer`,
    container: `${PREFIX}-container`,
  };

  const getBorder = (theme) =>
    `1px solid ${
      theme.palette.mode === "light"
        ? lighten(alpha(theme.palette.divider, 1), 0.88)
        : darken(alpha(theme.palette.divider, 1), 0.68)
    }`;

  const DayScaleCell = (props) => (
    <MonthView.DayScaleCell
      {...props}
      style={{ textAlign: "center", fontWeight: "bold" }}
    />
  );

  const StyledOpacity = styled(Opacity)(() => ({
    [`&.${classes.rain}`]: {
      color: "#4FC3F7",
    },
  }));

  const StyledWbSunny = styled(WbSunny)(() => ({
    [`&.${classes.sun}`]: {
      color: "#FFEE58",
    },
  }));

  const StyledFilterDrama = styled(FilterDrama)(() => ({
    [`&.${classes.cloud}`]: {
      color: "#90A4AE",
    },
  }));

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${classes.cell}`]: {
      color: "#78909C!important",
      position: "relative",
      userSelect: "none",
      verticalAlign: "top",
      padding: 0,
      height: 100,
      borderLeft: getBorder(theme),
      "&:first-of-type": {
        borderLeft: "none",
      },
      "&:last-child": {
        paddingRight: 0,
      },
      "tr:last-child &": {
        borderBottom: "none",
      },
      "&:hover": {
        backgroundColor: "white",
      },
      "&:focus": {
        backgroundColor: alpha(theme.palette.primary.main, 0.15),
        outline: 0,
      },
    },
    [`&.${classes.sunBack}`]: {
      backgroundColor: "#FFFDE7",
    },
    [`&.${classes.cloudBack}`]: {
      backgroundColor: "#ECEFF1",
    },
    [`&.${classes.rainBack}`]: {
      backgroundColor: "#E1F5FE",
    },
    [`&.${classes.opacity}`]: {
      opacity: "0.5",
    },
  }));

  const StyledDivText = styled("div")(() => ({
    [`&.${classes.text}`]: {
      padding: "0.5em",
      textAlign: "center",
    },
  }));

  const StyledDivContent = styled("div")(() => ({
    [`&.${classes.content}`]: {
      display: "flex",
      justifyContent: "center",
      width: "100%",
      height: "100%",
      position: "absolute",
      alignItems: "center",
    },
  }));

  const StyledAppointmentsAppointment = styled(Appointments.Appointment)(
    () => ({
      [`&.${classes.appointment}`]: {
        borderRadius: "10px",
        "&:hover": {
          opacity: 0.6,
        },
      },
    })
  );

  const StyledAppointmentsAppointmentContent = styled(
    Appointments.AppointmentContent
  )(() => ({
    [`&.${classes.apptContent}`]: {
      "&>div>div": {
        whiteSpace: "normal !important",
        lineHeight: 1.2,
      },
    },
  }));

  const WeatherIcon = ({ id }) => {
    switch (id) {
      case 0:
        return <StyledOpacity className={classes.rain} fontSize="large" />;
      case 1:
        return <StyledWbSunny className={classes.sun} fontSize="large" />;
      case 2:
        return <StyledFilterDrama className={classes.cloud} fontSize="large" />;
      default:
        return null;
    }
  };

  const CellBase = React.memo(
    ({
      startDate,
      formatDate,
      otherMonth,
      // #FOLD_BLOCK
    }) => {
      const iconId = Math.abs(
        Math.floor(Math.sin(startDate.getDate()) * 10) % 3
      );
      const isFirstMonthDay = startDate.getDate() === 1;
      const formatOptions = isFirstMonthDay
        ? { day: "numeric", month: "long" }
        : { day: "numeric" };
      return (
        <StyledTableCell
          tabIndex={0}
          className={classNames({
            [classes.cell]: true,
            [classes.rainBack]: iconId === 0,
            [classes.sunBack]: iconId === 1,
            [classes.cloudBack]: iconId === 2,
            [classes.opacity]: otherMonth,
          })}
        >
          <StyledDivContent className={classes.content}>
            <WeatherIcon classes={classes} id={iconId} />
          </StyledDivContent>
          <StyledDivText className={classes.text}>
            {formatDate(startDate, formatOptions)}
          </StyledDivText>
        </StyledTableCell>
      );
    }
  );

  const TimeTableCell = CellBase;

  const Appointment = ({ ...restProps }) => (
    <StyledAppointmentsAppointment
      {...restProps}
      className={classes.appointment}
    />
  );

  const AppointmentContent = ({ ...restProps }) => (
    <StyledAppointmentsAppointmentContent
      {...restProps}
      className={classes.apptContent}
    />
  );

  const [data, setData] = useState([]);
  const [tours, setTours] = useState([]);
  const { id } = useParams();
  const userAuth = useAuthUser();
  const tourGuideId = userAuth.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tripsResponse = await axios.get(
          `https://hella-booking.onrender.com/api/v1/schedules/${tourGuideId}`
        );
        const toursResponse = await axios.get(
          `https://hella-booking.onrender.com/api/v1/tours`
        );
        setData(tripsResponse.data.data);
        setTours(toursResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const appointments = data?.map((trip) => {
    const tour = tours.find((tour) => tour.id === trip.tourId);
    return {
      id: trip.id,
      title: tour ? tour.tourName : "Unknown Tour",
      startDate: moment(trip.startDate),
      endDate: moment(trip.endDate),
      ownerId: trip.tourGuideId,
    };
  });

  const toursInAppointments = appointments
    .map((appointment) => appointment.tourname)
    .filter((tourname, index, self) => self.indexOf(tourname) === index)
    .map((tourname) => ({
      id: tourname,
      text: tourname,
    }));

  const resources = [
    {
      fieldName: "tourname",
      title: "Tours",
      instances: toursInAppointments,
    },
  ];

  return (
    <Paper>
      <Scheduler data={appointments}>
        <ViewState defaultCurrentDate={new Date()} />
        <MonthView
          timeTableCellComponent={TimeTableCell}
          dayScaleCellComponent={DayScaleCell}
        />
        <Appointments
          appointmentComponent={Appointment}
          appointmentContentComponent={AppointmentContent}
        />
        <Resources data={resources} />
        <Toolbar />
        <DateNavigator />
        <AppointmentTooltip />
      </Scheduler>
    </Paper>
  );
}
