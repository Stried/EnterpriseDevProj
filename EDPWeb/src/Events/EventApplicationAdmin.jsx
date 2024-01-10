
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import http from "../../http";

const EventApplications = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    http.get('/event/GetAllApplications').then((res) => {
    console.log(res.data);
    setEvents(res.data);
    });
    }, []);


  
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
    <div>
      <div>
        <input type="text" value={search} onChange={handleSearchChange} />
        <button onClick={handleSearch}>Search</button>
      </div>
      <ul>
        {events.map((event) => (
          <li key={event.eventId} >
            
            {/* Render your event data here */}
            <p>Event Name: {event.eventName}</p>
            {/* Add more properties as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventApplications;