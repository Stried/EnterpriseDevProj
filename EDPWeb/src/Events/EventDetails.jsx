import { Button, Tabs } from "flowbite-react";
import { AiOutlineUser } from "react-icons/ai";
import { GrGroup } from "react-icons/gr";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import './MarkdownEditor.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import http from "../../http";
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "flowbite-react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  Card,
  Grid,
  Typography,
  CardContent,
} from "@mui/material";
function EventDetail() {
  let { EventId } = useParams();

  const [isCardShifted, setIsCardShifted] = useState(false);

  const handleToggle = () => {
    setIsCardShifted(!isCardShifted);
  };


  const [selectedevent, setevent] = useState("");
  const [dateTimeDates, setDateTimeDates] = useState([]);
  const [allowedDates, setAllowedDates] = useState([]);
  const [dateInfoList, setDateInfoList] = useState([]);

  useEffect(() => {
    http
      .get(`/event/Details/${EventId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setevent(res.data);

        const datesArray = res.data.dates;
        const dateInfoArray = [];

        const dateTimeDatesList = datesArray.map((dateObj) => dateObj.dateOfEvent);
        setDateTimeDates(dateTimeDatesList);

        datesArray.forEach((dateObj) => {
          const datePart = dateObj.dateOfEvent.split('T')[0];
          const dateTimePart = dateObj.dateOfEvent;
          
          dateInfoArray.push({
            dateOnly: datePart,
            dateTime: dateTimePart,
          });
        });

        setDateInfoList(dateInfoArray);
        console.log(dateInfoArray)
        dateInfoArray.forEach((dateInfo) => {
          console.log("Date Only:", dateInfo.dateOnly);
          console.log("Date Time:", dateInfo.dateTime);
        });

        const mappedDates = datesArray.map((dateObj) => {
          const datePart = dateObj.dateOfEvent.split('T')[0];
          console.log(datePart);
          return new Date(datePart);
        });
  
        setAllowedDates(mappedDates);
        console.log("The Event being viewed is " + EventId);
        console.log(datesArray);
        console.log(dateTimeDates)
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [EventId]);
  

  const formikApplication = useFormik({
    initialValues: selectedevent,
    validationSchema: yup.object().shape({
      Approval: yup.boolean(),
    }),
    onSubmit: async (data) => {
      console.log("Submit button clicked");
      console.log("Form data:", data);
      if (!formikApplication.isValid) {
        console.error("Form is not valid");
        return;
      }
      const updatedEvent = { ...selectedevent, Approval: true };
      console.log("Updated Event:", updatedEvent);
      http
        .put(`/event/Approval/${EventId}`, updatedEvent, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, 
          },
        })
        .then((res) => {
          console.log(res.data);
          navigate("/eventapplications");
        })
        .catch(function (err) {
          console.log(err);

          toast.error(`${err.response.data}`);
        });
    },
  });

  const navigate = useNavigate();
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const onChange = (date) => {
    setSelectedDate(date);

    const index = allowedDates.findIndex(
      (allowedDate) =>
        allowedDate.getFullYear() === date.getFullYear() &&
        allowedDate.getMonth() === date.getMonth() &&
        allowedDate.getDate() === date.getDate()
    );

    if (index !== -1) {
      const correspondingTime = dateTimeDates[index];
      const formattedTime = new Date(correspondingTime).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true, 
      });
      setSelectedTime(formattedTime);
    }
  };
        const tileDisabled = ({ date }) =>
        !allowedDates.some(
          (allowedDate) =>
            allowedDate.getFullYear() === date.getFullYear() &&
            allowedDate.getMonth() === date.getMonth() &&
            allowedDate.getDate() === date.getDate()
        );

  return (
    <div className="bg-gradient-to-br from-orange-400 to-red-500 py-10">
<div>
        <Calendar onChange={onChange} value={selectedDate} tileDisabled={tileDisabled} />
      </div>
      {selectedTime && (
        <div className="text-center text-lg mt-4">
          Selected Time: {selectedTime}
        </div>
      )}
    
          <div className="relative min-h-screen">
      <div className="relative min-h-screen text-white">
      <h1 className="text-center text-5xl text-black">Event Name:</h1>
        <h1 className="text-center text-5xl text-black">{selectedevent.eventName}</h1>
        <br></br>
        <div className="relative sm:rounded-lg mx-2 sm:mx-6 lg:mx-16 flex text-left">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
          <div className="w-full h-full">

            <Card
              className={`w-4/12 bg-gray-700 rounded-md absolute bottom-0 left-8.5 border-2 border-red-600 ${
                isCardShifted ? "transform translate-x-[370px]" : ""
              }`}
              style={{ width: "23.630rem", borderRadius: "8px", height: "33.25em", backgroundColor:"RGB(53, 63, 78)", transition: "transform 110ms ease-in-out", }}
            >
              <CardContent className="px-12">
                <Typography
                  variant="h4"
                  className="text-center text-4xl text-orange-400"
                >
                  Details:
                </Typography>

                <div className="w-max mr-10 mb-3 mt-3 pb-3 px-2 font-medium text-xl space-y-1 border-b-gray-700 border-solid border-b-2 text-white">
                  <p>
                    Event ID:{" "}
                    <span className="text-orange-400">
                    {selectedevent.eventId}
                    </span>
                  </p>
                  <p>
                    Event Type:{" "}
                    <span className="text-orange-400">
                    {selectedevent.activityType}
                    </span>
                  </p>
                  <p>
                    Event Entry Fee:{" "}
                    <span className="text-orange-400">
                    {selectedevent.eventPrice}
                    </span>
                  </p>

                  <p>
                    Uplay Friends Fee:{" "}
                    <span className="text-orange-400">
                    {selectedevent.friendPrice}
                    </span>
                  </p>
                  <p>
                    NTUC Members Fee:{" "}
                    <span className="text-orange-400">
                    {selectedevent.ntucPrice}
                    </span>
                  </p>
                  <p>
                  Event Location:{" "}
                    <span className="text-orange-400">
                    {selectedevent.eventPrice}
                    </span>
                  </p>
                  <p>
                    Max Participants:{" "}
                    <span className="text-orange-400">
                    {selectedevent.maxPax}
                    </span>
                  </p>
                  <p>
                    Posted by:{" "}

                    {selectedevent.user && (
                                <span className="text-orange-400"> {selectedevent.user.name}</span>
          )}

                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div
            className={`text-center top-10 left-1 absolute  ${
              isCardShifted ? "transform translate-x-[370px] duration" : ""
            }`}
            
            onClick={handleToggle}
            style={{ left: "23.520rem", top: "3.75rem", cursor: "pointer", transition: "transform 110ms ease-in-out" }}
          >
            <div className=" h-32 w-8 rounded-r-md border-y-2 border-y-red-600 border-r-2 border-r-red-600" style={{ backgroundColor:"RGB(53, 63, 78)"}}>
              <div className="text-center top-4 left-2 relative">
                {!isCardShifted && (
                  <div className="h-20 w-7 ">
                    <div className="left-1 top-10 absolute  ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512"
                        fill="rgb(220 38 38)"
                      >
                        <path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" />
                      </svg>
                    </div>
                  </div>
                )}
                {isCardShifted && (
                  <div className="h-20 w-7">
                    <div className="left-1 top-10 absolute ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512"
                        fill="rgb(220 38 38)"
                      >
                        <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          </div>

          <div className="col-span-1">
            <Grid
              item
              xs={12}
              md={6}
              lg={6}
              key={selectedevent.eventId}
              className="ml-64"
            >

              <div className="w-2/3 grid grid-cols- columns-2">
              <Card className="w-96 relative rounded-md z-20 border-2 border-red-600" style={{height:"33.25em"}}>
        <CardContent className="px-12 ">
        <Typography
                  variant="h4"
                  className="text-center text-4xl text-orange-400"
                >
                  Description:
                </Typography>

                <br />
                <br />
                <div className=" border-2 border-orange-400 rounded-md ">
                  <div className="p-2 max-h-96 overflow-auto ">

                  <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose h-96">
            {selectedevent.contentHTML}
          </ReactMarkdown>

<br></br>
                  </div>
                </div>
        </CardContent>
      </Card>
              </div>

            </Grid>
          </div>
        </div>
      </div>
      <div className="p-5 text-right mr-10 w-1/2 mx-auto rounded-lg ">
        <form
          onSubmit={formikApplication.handleSubmit}
          className="text-lg font-medium"
        >

          <button
            type="submit"
            className="bg-gradient-to-br from-orange-400 to-red-500 px-3 py-2 rounded-md tracking-wide hover:brightness-90 transition ease-in-out duration-300"
          >
            Add to Cart
          </button>
        </form>
      </div>
    </div>
    </div>

  );
}
export default EventDetail;
