import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './EventClosestDateAnim.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import http from "../../http";
import { Box, IconButton, Card, CardContent } from "@mui/material";

const EventOverview = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState("eventId");
  const [sortDirection, setSortDirection] = useState("asc");

  const getEventApplications = () => {
    http.get('/event/GetAllEvents').then((res) => {
      console.log(res.data);
      setEvents(res.data);
    });
  };

  useEffect(() => {
    getEventApplications();
  }, []);

  function convertDateFormat(dateStr) {
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

  const sortEventApplications = (field, direction) => {
    const sortedList = [...events];
    sortedList.sort((a, b) => {
      if (direction === "asc") {
        return a[field].localeCompare(b[field], undefined, { numeric: true });
      } else {
        return b[field].localeCompare(a[field], undefined, { numeric: true });
      }
    });
    setEvents(sortedList);
  };

  const onSortChange = (field) => {
    const newDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(newDirection);
    sortEventApplications(field, newDirection);
  };

  const onUnsortClick = () => {
    setSortField("eventId");
    setSortDirection("asc");
    getEventApplications();
  };
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [closestDates, setClosestDates] = useState(Array(events.length).fill(null));

  const handleMouseEnter = (index) => {
      setHoveredIndex(index);


      const currentDate = new Date();
      const dates = events[index]?.dates || [];

      const closestDateObj = dates.reduce((closest, date) => {
          const dateObj = new Date(date.dateOfEvent);
          const timeDiff = Math.abs(dateObj - currentDate);

          if (closest === null || timeDiff < closest.timeDiff) {
              return { dateObj, timeDiff };
          }

          return closest;
      }, null);

      setClosestDates((prevDates) => {
          const newDates = [...prevDates];
          newDates[index] = closestDateObj?.dateObj;
          return newDates;
      });
  };

  const handleMouseLeave = () => {
      setHoveredIndex(null);
      setClosestDates(Array(events.length).fill(null));
  };


  const hasWeeklyPattern = (dates) => {
    const daysOfWeek = dates.map(date => new Date(date.dateOfEvent).getDay());
    const uniqueDaysOfWeek = [...new Set(daysOfWeek)];

    return uniqueDaysOfWeek.length === 1; 
};

const getWeeklyPatternMessage = (dates) => {
    const dayOfWeek = new Date(dates[0].dateOfEvent).toLocaleDateString('en-US', { weekday: 'long' });
    return `Every ${dayOfWeek}`;
};


const getClosestDateStyles = (index) => {
  const baseStyles = {
    position: 'absolute',
    top: '-82px',  
    right: '-100%',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',  
    alignItems: 'flex-end',   
    justifyContent: 'flex-end',
    padding: '10px',
    boxSizing: 'border-box',
    animation: 'none',
    transition: 'right 0.3s ease-in-out',
  };

  if (hoveredIndex === index) {
    baseStyles.right = 0;
    baseStyles.animation = 'slideInRight 0.5s forwards';
  }

  return baseStyles;
};

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

  return (
      <div className="relative min-h-screen ">
          <Box>
              <h1 className="text-center text-5xl mt-10 text-black">Events</h1>
              <div
                  className="text-center border-4"
                  style={{
                      width: "1000px",
                      margin: "0 auto",
                      marginBottom: "75px",
                      marginTop: "25px",
                  }}
              >
                  <div className="pt-2">
                      <input
                          type="text"
                          id="search"
                          onChange={handleSearchChange}
                          value={search}
                          placeholder="Search by Event Title or User ID..."
                          className="bg-transparent border-gray-800 border-2 rounded w-1/2 px-3 py-2 my-2 focus:outline-none focus:ring focus:ring-red-400"
                          onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                  handleSearch();
                              }
                          }}
                      />

                      <button
                          onClick={handleSearch}
                          className=" bg-gradient-to-br ml-5 from-orange-400 to-red-500 px-3 py-2 rounded-md tracking-wide hover:brightness-90 transition ease-in-out duration-300"
                      >
                          Search
                      </button>
                  </div>
                  <div className="text-center text-xl text-orange-500 py-2">
                      <Link to={"/eventapply"}>
                          Interested in hosting your own events? Create one
                          here!
                      </Link>
                  </div>
              </div>

              <div className="flex flex-wrap justify-center gap-8 mb-96 ">
                  {events.map((event, i) => (
                      <Link to={`/eventoverviewuser/Details/${event.eventId}`}>
                          <Card
                              className="min-w-max w-96"
                              style={{
                                  boxShadow:
                                      hoveredIndex === i
                                          ? "10px 10px 20px rgba(0, 0, 0, 0.5)"
                                          : "0 4px 6px rgba(0, 0, 0, 0.1)",
                                  transform:
                                      hoveredIndex === i
                                          ? "scale(1.03, 1.03)"
                                          : "scale(1)",
                                  transformOrigin: "top left",
                                  transition:
                                      "box-shadow 0.3s ease-in-out, transform 0.2s ease-in-out",
                                  backgroundColor: "#F5F5F5",
                              }}
                              onMouseEnter={() => handleMouseEnter(i)}
                              onMouseLeave={handleMouseLeave}
                          >
                              <CardContent>
                              <div className="mb-2 flex items-center justify-center">
                            <img
                              className="object-contain drop-shadow-lg rounded"
                              style={{ maxHeight: '200px', maxWidth:'350px' }}
                              src={`${import.meta.env.VITE_FILE_EVENT_URL}${event.eventImageFile}`}
                              alt="Image"
                            />
                          </div>
                                  <h2 className="text-xl font-bold mb-2">
                                      {truncateText(event.eventName, 34)}
                                  </h2>
                                  <p>Posted by: {event.user.name}</p>
                                  <span className="inline-block">
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
                                          class="feather feather-map-pin"
                                      >
                                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                          <circle
                                              cx="12"
                                              cy="10"
                                              r="3"
                                          ></circle>
                                      </svg>
                                  </span>{" "}
                                  {truncateText(event.eventLocation, 21)}
                                  
                                  {event.dates.length > 0 && (
                                <p className="ml-7 relative pt-2">
                                    <span className="inline-block">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="feather feather-calendar absolute top-1 left-[-28px]"
                                        >
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                            <line x1="16" y1="2" x2="16" y2="6"></line>
                                            <line x1="8" y1="2" x2="8" y2="6"></line>
                                            <line x1="3" y1="10" x2="21" y2="10"></line>
                                        </svg>
                                    </span>
                                    {event.dates.length === 1
                                        ? new Date(event.dates[0].dateOfEvent).toLocaleDateString()
                                        : hasWeeklyPattern(event.dates)
                                        ? getWeeklyPatternMessage(event.dates)
                                        : "Multiple Sessions"}
                                </p>
                                  )}
                                  <div className="flex justify-between mt-12 relative">
                                      {(() => {
                                          switch (event.activityType) {
                                              case "Dine and Wine":
                                                  return (
                                                      <div className="absolute bottom-0 right-0 border-0 bg-red-400 p-1 rounded-lg text-white">
                                                          <p>
                                                              {
                                                                  event.activityType
                                                              }
                                                          </p>
                                                      </div>
                                                  );

                                              case "Hobbies and Wellness":
                                                  return (
                                                      <div className="absolute bottom-0 right-0 border-0 bg-violet-400 p-1 rounded-lg text-white">
                                                          <p>
                                                              {
                                                                  event.activityType
                                                              }
                                                          </p>
                                                      </div>
                                                  );
                                              case "Family and Friends":
                                                  return (
                                                      <div className="absolute bottom-0 right-0 border-0 bg-sky-400 p-1 rounded-lg text-white">
                                                          <p>
                                                              {
                                                                  event.activityType
                                                              }
                                                          </p>
                                                      </div>
                                                  );
                                              case "Sports":
                                                  return (
                                                      <div className="absolute bottom-0 right-0 border-0 bg-orange-400 p-1 rounded-lg text-white">
                                                          <p>
                                                              {
                                                                  event.activityType
                                                              }
                                                          </p>
                                                      </div>
                                                  );
                                              case "Adventure":
                                                  return (
                                                      <div className="absolute bottom-0 right-0 border-0 bg-yellow-300 p-1 rounded-lg text-white">
                                                          <p>
                                                              {
                                                                  event.activityType
                                                              }
                                                          </p>
                                                      </div>
                                                  );
                                              case "Travel":
                                                  return (
                                                      <div className="absolute bottom-0 right-0 border-0 bg-teal-300 p-1 rounded-lg text-white">
                                                          <p>
                                                              {
                                                                  event.activityType
                                                              }
                                                          </p>
                                                      </div>
                                                  );
                                              default:
                                                  return (
                                                      <p>
                                                          {event.activityType}
                                                      </p>
                                                  );
                                          }
                                      })()}
                                      {closestDates[i] && (
                                          <div style={getClosestDateStyles(i)}>
                                              <p>Next Occurrence: </p>
                                              <p>
                                                  <span className="inline-block pb-6">
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
                                                          class="feather feather-clock"
                                                          style={{
                                                              position:
                                                                  "absolute",
                                                              top: "-15px",
                                                              left: "235px",
                                                          }}
                                                      >
                                                          <circle
                                                              cx="12"
                                                              cy="12"
                                                              r="10"
                                                          ></circle>
                                                          <polyline points="12 6 12 12 16 14"></polyline>
                                                      </svg>
                                                  </span>
                                                  <span className="pl-2">
                                                      {closestDates[
                                                          i
                                                      ].toLocaleDateString()}
                                                  </span>
                                              </p>
                                          </div>
                                      )}
                                      <div
                                          style={{
                                              position: "absolute",
                                              bottom: 3,
                                              left: 0,
                                              marginLeft: "0px",
                                          }}
                                      >
                                          {event.eventPrice !== 0 ? (
                                              <p>${event.eventPrice}</p>
                                          ) : (
                                              <p>Free</p>
                                          )}
                                      </div>
                                  </div>
                              </CardContent>
                          </Card>
                      </Link>
                  ))}
              </div>

              <ToastContainer />
          </Box>
      </div>
  );
};

export default EventOverview;
