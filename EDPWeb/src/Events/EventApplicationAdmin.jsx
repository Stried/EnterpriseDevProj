
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { Modal } from "flowbite-react";
import http from "../../http";
import { Box, IconButton } from "@mui/material";
const EventApplications = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [openModals, setOpenModals] = useState([]);
  useEffect(() => {
    http.get('/event/GetAllApplications').then((res) => {
    console.log(res.data);
    setEvents(res.data);
    });
    }, []);

    const toggleModal = (index) => {
      setOpenModals((prevOpenModals) => {
        const updatedModals = [...prevOpenModals];
        updatedModals[index] = !updatedModals[index];
        return updatedModals;
      });
    };
  
    function convertDateFormat(dateStr) {
      // Parse the input date string using Date object
      const date = new Date(dateStr);
    
      // Extract year, month, and day components
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed, add 1 and pad with leading zero if needed
      const day = String(date.getDate()).padStart(2, '0'); // Pad day with leading zero if needed
    
      // Construct the output date string in the desired format
      const formattedDate = `${day}/${month}/${year}`;
    
      return formattedDate;
    }

  const handleSearch = async () => {
    try {
      const response = await fetch(`/event/GetAllApplications?search=${search}`);
      
      // Check the response status
      if (!response.ok) {
        console.error('Error fetching data. Status:', response.status);
        return;
      }
  
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };



  return (

<div className="relative min-h-screen ">
      <Box>

        <h1 className="text-center text-5xl mt-10 text-black">
          Event Application Records
        </h1>
        <br></br>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mx-7 ">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs uppercase bg-gradient-to-br from-orange-400 to-red-500 text-black">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Event Title
                </th>
                <th scope="col" class="px-6 py-3">
                  <div
                    class="flex items-center"
                  >
                    User ID of creator
                    <a href="#">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-3 h-3 ml-1"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 320 512"
                      >
                        <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                      </svg>
                    </a>
                  </div>
                </th>
                <th scope="col" class="px-6 py-3">
                  <div
                    class="flex items-center"
                  >
                    Posted Date
                    <a href="#">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-3 h-3 ml-1"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 320 512"
                      >
                        <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                      </svg>
                    </a>
                  </div>
                </th>
                <th
                  scope="col"
                  class="px-6 py-3"
                >
                  <div class="flex items-center">
                    Activity Type
                    <a href="#">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-3 h-3 ml-1"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 320 512"
                      >
                        <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                      </svg>
                    </a>
                  </div>
                </th>
                <th scope="col" class="px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
                <th className="pl-20">
                  <div
                    className="w-5 h-5 cursor-pointer"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M12 2.99988C16.9706 2.99988 21 7.02931 21 11.9999C21 16.9704 16.9706 20.9999 12 20.9999C7.02944 20.9999 3 16.9704 3 11.9999C3 9.17261 4.30367 6.64983 6.34267 4.99988"
                          stroke="#292929"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                        ></path>
                        <path
                          d="M3 4.49988H7V8.49988"
                          stroke="#292929"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                        ></path>
                      </g>
                    </svg>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, i) => {
                return (
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {event.eventName}
                    </th>

                    <td class="px-6 py-4">{event.userID}</td>
                    <td class="px-6 py-4">{convertDateFormat(event.eventCreatedAt)}</td>
                    <td class="px-6 py-4">{event.activityType}</td>
                    <td>
                      <Link
                        to={`/event/Approval/${event.eventId}`}
                        className="bg-orange-400 p-2 px-5 rounded-md text-black hover:bg-green-600 hover:text-white "
                      >
                        View Details
                      </Link>
                    </td>
                    <td class="pl-0 pr-4 py-4 text-right">
                      <a
                        onClick={() => {
                          toggleModal(i);
                        }}
                        href="#"
                        className="bg-red-500 p-2 px-5 rounded-md text-black hover:bg-red-600 hover:text-white "
                      >
                        Decline
                      </a>
                      <Modal
                        dismissible
                        show={openModals[i] === true}
                        onClose={() => toggleModal(i)}
                      >
                        <Modal.Header>Trial Car Deletion</Modal.Header>
                        <Modal.Body>
                          <div className="space-y-6">
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                              Are you sure you want to delete the trial car
                              with:{" "}
                              <div>
                                Event ID: <b>{event.eventId}</b>
                              </div>{" "}
                              <div>
                                Event Title: <b>{event.eventName}</b>
                              </div>
                            </p>
                          </div>
                        </Modal.Body>
                        <Modal.Footer>
                          <button
                            onClick={() =>
                              deleteTrialCar("/")
                            }
                            className="px-3 py-2 bg-red-500 hover:bg-red-600 hover:text-white rounded font-medium"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => toggleModal(i)}
                            className="px-3 py-2 bg-sky-400 hover:bg-sky-600 hover:text-white rounded font-medium"
                          >
                            Cancel
                          </button>
                        </Modal.Footer>
                      </Modal>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <ToastContainer />
      </Box>
    </div>

  );
};

export default EventApplications;