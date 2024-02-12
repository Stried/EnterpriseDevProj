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
function ApproveEvent() {
  let { EventId } = useParams();

  const [isCardShifted, setIsCardShifted] = useState(false);

  const handleToggle = () => {
    setIsCardShifted(!isCardShifted);
  };

  const [openModals, setOpenModals] = useState([]);

  const toggleModal = (index) => {
    setOpenModals((prevOpenModals) => {
      const updatedModals = [...prevOpenModals];
      updatedModals[index] = !updatedModals[index];
      return updatedModals;
    });
  };

  const declineEventApplication = (EventId) => {
    http
      .delete(`/event/${EventId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        navigate("/");
      });
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

  const navigate = useNavigate();
  const [selectedTime, setSelectedTime] = useState(null);

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
  const earliestDate = allowedDates.length > 0 ? new Date(Math.min(...allowedDates)) : new Date();
  const maxDate = allowedDates.length > 0 ? new Date(Math.max(...allowedDates)) : new Date();

        const tileDisabled = ({ date }) =>
        !allowedDates.some(
          (allowedDate) =>
            allowedDate.getFullYear() === date.getFullYear() &&
            allowedDate.getMonth() === date.getMonth() &&
            allowedDate.getDate() === date.getDate()
        );

        const sanitizedHtml = DOMPurify.sanitize(selectedevent.contentHTML);


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
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-coffee"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>
                    <span className="ml-2">Dine and Wine</span>
                  </div>
                );
              case "Adventure":
                return (
                  <div className="text-3xl text-yellow-300 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-compass"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
                  <span className="ml-2">Adventure</span>
                </div>
                );
                case "Family and Friends":
                  return (
                    <div className="text-3xl text-sky-400 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                      <span className="ml-2">Family and Friends</span>
                    </div>
                  );
                  case "Travels":
                    return (
                      <div className="text-3xl text-teal-300 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-wind"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path></svg>
                        <span className="ml-2">Travels</span>
                      </div>
                    );
                    case "Sports":
                      return (
                        <div className="text-3xl text-orange-400 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-dribbble"><circle cx="12" cy="12" r="10"></circle><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"></path></svg>
                          <span className="ml-2">Sports</span>
                        </div>
                      );
                      case "Hobbies and Wellness":
                        return (
                          <div className="text-3xl text-violet-400 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                            <span className="ml-2">Hobbies and Wellness</span>
                          </div>
                        );
              default:
                return null; 
            }
          })()}
      </p>

    <h1 className=" text-5xl text-black">{selectedevent.eventName}</h1>
    <div className="text-3xl text-black flex items-center">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>
                  <span className="ml-2"><p className="text-2xl py-5">{selectedevent.eventLocation}</p></span>
                </div>
    <div className="border-b-2 border-gray-300 mb-4" />

<div>Available spots left: </div>
    <div className="prose" dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
  </div>


<div className="flex flex-col items-end space-y-4"> 
        <div className="bg-gray-100 p-4 rounded-md shadow-md sticky top-20"> 
          {(console.log("Selected Date:", selectedDate))}
          <Calendar onChange={onChange} value={selectedDate} tileDisabled={tileDisabled}
          minDate={earliestDate}
          maxDate={maxDate}
          />
          {selectedTime && (
            <div className="text-center text-lg mt-4">Selected Time: {selectedTime}</div>
          )}

              {selectedevent.eventPrice !== 0 ? (
                <p className="py-5 text-xl">Event Price: ${selectedevent.eventPrice}</p>
              ) : (
                <p className="py-5 text-xl"> Event Price: Free</p>
              )}


        </div>
              <div className="p-5 text-right mr-10 w-1/2 mx-auto rounded-lg ">
        <form
          onSubmit={formikApplication.handleSubmit}
          className="text-lg font-medium"
        >
          <a
            onClick={() => {
              toggleModal(EventId);
            }}
            href="#"
            className="bg-red-600 mr-3 p-2 px-5 rounded-md text-black hover:bg-red-600 hover:text-white "
          >
            Decline
          </a>
          <Modal
            dismissible
            show={openModals[EventId] === true}
            onClose={() => toggleModal(EventId)}
          >
            <Modal.Header>Event Application Decline</Modal.Header>
            <Modal.Body>
              <div className="space-y-6">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Are you sure you want to decline the event with:{" "}
                  <div>
                    title: <b>{selectedevent.eventName}</b>
                  </div>{" "}
                  <div>
                    and Event ID: <b>{selectedevent.eventId}</b>
                  </div>
                </p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                onClick={() =>
                  declineEventApplication(`${selectedevent.eventId}`)
                }
                className="px-3 py-2 bg-red-500 hover:bg-red-600 hover:text-white rounded font-medium"
              >
                Delete
              </button>
              <button
                onClick={() => toggleModal(EventId)}
                className="px-3 py-2 bg-sky-400 hover:bg-sky-600 hover:text-white rounded font-medium"
              >
                Cancel
              </button>
            </Modal.Footer>
          </Modal>
          <button
            type="submit"
            className="bg-gradient-to-br from-orange-400 to-red-500 px-3 py-2 rounded-md tracking-wide hover:brightness-90 transition ease-in-out duration-300"
          >
            Approve
          </button>
        </form>
      </div>
      </div>
    </div>
</div>

  );
}
export default ApproveEvent;
