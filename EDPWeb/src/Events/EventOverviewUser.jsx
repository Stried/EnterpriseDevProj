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
import { Box, IconButton, Card, CardContent } from "@mui/material";

const EventOverview = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState("eventId");
  const [sortDirection, setSortDirection] = useState("asc");

  const getEventApplications = () => {
    http.get('/event/GetAllApplications').then((res) => {
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

  return (
    <div className="relative min-h-screen ">
      <Box>
        <h1 className="text-center text-5xl mt-10 text-black">
          Event Application Records
        </h1>

        <div className="text-center mt-5 mb-5">
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
            className="bg-gradient-to-br ml-5 from-orange-400 to-red-500 px-3 py-2 rounded-md tracking-wide hover:brightness-90 transition ease-in-out duration-300"
          >
            Search
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {events.map((event, i) => (
            <Card key={i} className="min-w-max">
              <CardContent>
                <h2 className="text-xl font-bold mb-2">{event.eventName}</h2>
                <p>User ID: {event.userID}</p>
                <p>Posted Date: {convertDateFormat(event.eventCreatedAt)}</p>
                <p>Activity Type: {event.activityType}</p>
                <p>Base Entry Fee: {event.eventPrice}</p>
                <div className="flex justify-between mt-4">
                <Link
                    to={`/eventoverviewuser/Details/${event.eventId}`}
                    className="block bg-orange-400 p-2 px-5 rounded-md text-black hover:bg-red-600 hover:text-white"
                  >
                    View Details
                  </Link>
                  <button
                    className="block ml-4 bg-green-400 p-2 px-5 rounded-md text-black hover:bg-green-600 hover:text-white"
                    onClick={() => handleAddToCart(event)}
                  >
                    Add to Cart
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <ToastContainer />
      </Box>
    </div>
  );
};

export default EventOverview;
