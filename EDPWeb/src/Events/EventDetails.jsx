import { Button, Tabs } from "flowbite-react";
import { AiOutlineUser } from "react-icons/ai";
import { GrGroup } from "react-icons/gr";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import './MarkdownEditor.css';
import ReactMarkdown from 'react-markdown';
import UserContext from "../Users/UserContext";
import remarkGfm from 'remark-gfm';
import http from "../../http";
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "flowbite-react";
import DOMPurify from 'dompurify';
import Calendar from 'react-calendar';
import './Calendar.css';
import 'react-calendar/dist/Calendar.css';
import './prose.css'
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
import { select } from "slate";

function EventDetail() {
  let { EventId } = useParams();

  const [isCardShifted, setIsCardShifted] = useState(false);

  const handleToggle = () => {
    setIsCardShifted(!isCardShifted);
  };

  const [error, setError] = useState("");
  const [selectedevent, setevent] = useState("");
  const [dateTimeDates, setDateTimeDates] = useState([]);
  const [allowedDates, setAllowedDates] = useState([]);
  const [dateInfoList, setDateInfoList] = useState([]);
  const [dateId, setDateId] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [populateddates, setpopulateddates] = useState([]);
  const earliestDate = allowedDates.length > 0 ? new Date(Math.min(...allowedDates)) : new Date();
  const maxDate = allowedDates.length > 0 ? new Date(Math.max(...allowedDates)) : new Date();
  const [selectedDate, setSelectedDate] = useState(earliestDate);
  console.log(selectedevent.eventImageFile);
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
        setpopulateddates(datesArray);
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

  const navigate = useNavigate();
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedremaining, setselectedremaining] = useState();
  const onChange = (date) => {
    setSelectedDate(date);
  };
  
  useEffect(() => {
    const index = allowedDates.findIndex(
      (allowedDate) =>
        allowedDate.getFullYear() === selectedDate.getFullYear() &&
        allowedDate.getMonth() === selectedDate.getMonth() &&
        allowedDate.getDate() === selectedDate.getDate()
    );
  
    if (index !== -1) {
      const correspondingTime = dateTimeDates[index];
      const formattedTime = new Date(correspondingTime).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      setSelectedTime(formattedTime);
  
      const selectedDateTimeObj = new Date(dateTimeDates[index]);
  
      const year = selectedDateTimeObj.getFullYear();
      const month = String(selectedDateTimeObj.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDateTimeObj.getDate()).padStart(2, '0');
      const hours = String(selectedDateTimeObj.getHours()).padStart(2, '0');
      const minutes = String(selectedDateTimeObj.getMinutes()).padStart(2, '0');
      const seconds = String(selectedDateTimeObj.getSeconds()).padStart(2, '0');
  
      const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  
      setSelectedDateTime(formattedDateTime);
      setselectedremaining(selectedevent.dates[index].remainingPax)
      setDateId(selectedevent.dates[index].dateId);
    } else {
      setSelectedTime(null);
      setSelectedDateTime(null);
      setDateId(null);
    }
    console.log(dateId)
  }, [selectedDate, allowedDates, dateTimeDates, selectedevent.dates]);



        const tileDisabled = ({ date }) =>
        !allowedDates.some(
          (allowedDate) =>
            allowedDate.getFullYear() === date.getFullYear() &&
            allowedDate.getMonth() === date.getMonth() &&
            allowedDate.getDate() === date.getDate()
        );


console.log("the populated:"+ populateddates);

        const sanitizedHtml = DOMPurify.sanitize(selectedevent.contentHTML);
        console.log(selectedDateTime)
        console.log(dateTimeDates)


        const addToCart = () => {
            if (!selectedDateTime || !dateTimeDates.includes(selectedDateTime)) {
                setError("Please select a valid date and time for this event.");
                return;
              }

              const rawData =
              {
                Quantity: 1,
                EventId: EventId,
                EventPrice: selectedevent.eventPrice,
                EventName: selectedevent.eventName,
                DateId: dateId,
                DateOfEvent: selectedDateTime,
              }

          http.post("/cart/AddCartItem", rawData, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          })
          .then((res) => console.log(res))
          .catch((error) => {
            console.error(error);
            setError("An error occurred while adding to the cart. Please try again.");
          });
        }
        const { user } = useContext(UserContext);
        useEffect(() => {
          if (!user || !user.id) {
            toast.error("You can only view an event if you are logged in.");
      
            navigate("/login");
          }
        }, [user, navigate]);

  return (
      <div className="bg-white">
          <div className=" p-5 grid grid-cols-2 gap-8 mx-28">
              <div>
                  <p className="pb-5">
                      {(() => {
                          switch (selectedevent.activityType) {
                              case "Dine and Wine":
                                  return (
                                      <div className="text-3xl text-red-400 flex items-center">
                                          <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              stroke="currentColor"
                                              stroke-width="2"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                              class="feather feather-coffee"
                                          >
                                              <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                                              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                                              <line
                                                  x1="6"
                                                  y1="1"
                                                  x2="6"
                                                  y2="4"
                                              ></line>
                                              <line
                                                  x1="10"
                                                  y1="1"
                                                  x2="10"
                                                  y2="4"
                                              ></line>
                                              <line
                                                  x1="14"
                                                  y1="1"
                                                  x2="14"
                                                  y2="4"
                                              ></line>
                                          </svg>
                                          <span className="ml-2">
                                              Dine and Wine
                                          </span>
                                      </div>
                                  );
                              case "Adventure":
                                  return (
                                      <div className="text-3xl text-yellow-300 flex items-center">
                                          <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              stroke="currentColor"
                                              stroke-width="2"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                              class="feather feather-compass"
                                          >
                                              <circle
                                                  cx="12"
                                                  cy="12"
                                                  r="10"
                                              ></circle>
                                              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                                          </svg>
                                          <span className="ml-2">
                                              Adventure
                                          </span>
                                      </div>
                                  );
                              case "Family and Friends":
                                  return (
                                      <div className="text-3xl text-sky-400 flex items-center">
                                          <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              stroke="currentColor"
                                              stroke-width="2"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                              class="feather feather-home"
                                          >
                                              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                              <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                          </svg>
                                          <span className="ml-2">
                                              Family and Friends
                                          </span>
                                      </div>
                                  );
                              case "Travels":
                                  return (
                                      <div className="text-3xl text-teal-300 flex items-center">
                                          <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              stroke="currentColor"
                                              stroke-width="2"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                              class="feather feather-wind"
                                          >
                                              <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path>
                                          </svg>
                                          <span className="ml-2">Travels</span>
                                      </div>
                                  );
                              case "Sports":
                                  return (
                                      <div className="text-3xl text-orange-400 flex items-center">
                                          <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              stroke="currentColor"
                                              stroke-width="2"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                              class="feather feather-dribbble"
                                          >
                                              <circle
                                                  cx="12"
                                                  cy="12"
                                                  r="10"
                                              ></circle>
                                              <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"></path>
                                          </svg>
                                          <span className="ml-2">Sports</span>
                                      </div>
                                  );
                              case "Hobbies and Wellness":
                                  return (
                                      <div className="text-3xl text-violet-400 flex items-center">
                                          <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              stroke="currentColor"
                                              stroke-width="2"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                              class="feather feather-heart"
                                          >
                                              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                          </svg>
                                          <span className="ml-2">
                                              Hobbies and Wellness
                                          </span>
                                      </div>
                                  );
                              default:
                                  return null;
                          }
                      })()}
                  </p>

                  <h1 className=" text-5xl text-black">
                      {selectedevent.eventName}
                  </h1>
                  <div className="text-3xl text-black flex items-center">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="feather feather-map"
                      >
                          <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
                          <line
                              x1="8"
                              y1="2"
                              x2="8"
                              y2="18"
                          ></line>
                          <line
                              x1="16"
                              y1="6"
                              x2="16"
                              y2="22"
                          ></line>
                      </svg>
                      <span className="ml-2">
                          <p className="text-2xl py-5">
                              {selectedevent.eventLocation}
                          </p>
                      </span>
                  </div>
                  <div className="mb-2 flex items-center justify-center">
                      <img
                          className="object-contain max-h-full drop-shadow-lg rounded"
                          style={{ maxHeight: '300px', maxWidth:'450px' }}
                          src={`${
                              import.meta.env.VITE_FILE_EVENT_URL
                          }${selectedevent.eventImageFile}`}
                          alt="Image"
                      />
                  </div>
                  <div className="border-b-2 border-gray-300 mb-4" />


    <div className="prose-content " dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
  </div>

              <div className="flex flex-col items-end space-y-4">
                  <div className="bg-gray-100 p-4 rounded-md shadow-md sticky top-20">
                      {console.log("Selected Date:", selectedDate)}
                      <Calendar
                          onChange={onChange}
                          value={selectedDate}
                          tileDisabled={tileDisabled}
                          minDate={earliestDate}
                          maxDate={maxDate}
                      />


              {populateddates.length=== 0 ?(<p className="text-red-500 text-center">Sorry, we're all booked out!</p>):(<span></span>)}
                      {selectedTime && (
                          <div className="text-center text-lg mt-4">
                              Selected Time: {selectedTime}
                          </div>
                      )}
                 {selectedDateTime && (
            <div className="text-center text-lg mt-4">
              Selected DateTime: {selectedDateTime}
            </div>
          )}
                  {error && (
          <div className="text-red-500 text-center mt-4">
            {error}
          </div>
        )}
                <div className="py-3">Available spots left:{selectedremaining} </div>
                      {selectedevent.eventPrice !== 0 ? (
                        
                          <p className="pb-3 text-xl">
                              Event Price: ${selectedevent.eventPrice}
                          </p>
                      ) : (
                          <p className="pb-3 text-xl"> Event Price: Free</p>
                      )}

                      <div className="p-5 text-right space-x-4">
                          <button
                              onClick={addToCart}
                              type="submit"
                              className="bg-gradient-to-br from-orange-400 to-red-500 px-3 py-2 rounded-md tracking-wide hover:brightness-90 transition ease-in-out duration-300"
                          >
                              Add to Cart
                          </button>
                          <button
                              onClick={() => console.log("View Cart clicked")}
                              className="bg-gray-300 px-3 py-2 rounded-md tracking-wide hover:bg-gray-400 transition ease-in-out duration-300"
                          >
                              View Cart
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
}
export default EventDetail;
