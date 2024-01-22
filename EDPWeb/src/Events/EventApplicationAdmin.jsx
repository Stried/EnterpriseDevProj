
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

import http from "../../http";
import { Box, IconButton } from "@mui/material";
const EventApplications = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    http.get('/event/GetAllApplications').then((res) => {
    console.log(res.data);
    setEvents(res.data);
    });
    }, []);


  
    function convertDateFormat(dateStr) {
      // Parse the input date string using Date object
      const date = new Date(dateStr);
    

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); 
      const day = String(date.getDate()).padStart(2, '0'); 
    

      const formattedDate = `${day}/${month}/${year}`;
    
      return formattedDate;
    }

    const handleSearch = async () => {
      try {
        const response = await http.get(`/event/GetAllApplications?search=${search}`);
        
        let data;
        if (response.data) {

          data = response.data;
        } else {
          
          data = JSON.parse(response);
        }
  
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
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
                <th
                  scope="col"
                  class="px-6 py-3"
                >
                  <div class="flex items-center">
                    Base Entry Fee
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
                    <td class="px-6 py-4">{event.eventPrice}</td>
                    <td>
                      <Link
                        to={`/eventapplicationdetailed/Details/${event.eventId}`}
                        className="bg-orange-400 p-2 px-5 rounded-md text-black hover:bg-red-600 hover:text-white "
                      >
                        View Details
                      </Link>
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