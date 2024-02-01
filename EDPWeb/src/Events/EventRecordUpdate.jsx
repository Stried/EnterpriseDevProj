import { AiOutlineUser } from "react-icons/ai";
import { GrGroup } from "react-icons/gr";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import http from "../../http";
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { red } from "@mui/material/colors";
import CustomSelect from "./CustomSelect";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/red.css";
import "./DatePickerStyle.css";
import "./CustomSelectStyle.css";
import MarkdownEditor from "./MarkDownEditor";
import UserContext from "../Users/UserContext";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import ReactMarkdown from "react-markdown";
import {
  Box,
  RadioGroup,
  FormControlLabel,
  Button,
  Radio,
} from "@mui/material";

function UpdateEvent() {
  const { user } = useContext(UserContext);
  const { eventId } = useParams();

  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    // Fetch event data from the backend based on the eventId
    const fetchEventData = async () => {
      try {
        const response = await http.get(`/event/Applications/${eventId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setEventData(response.data);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEventData();
  }, [eventId]);

  const formikEvent = useFormik({
    initialValues: {
      EventName: "",
      EventPrice: 0,
      FriendPrice: 0,
      NTUCPrice: 0,
      MaxPax: 1,
      Approval: false,
      ActivityType: "",
      EventLocation: "",
      ExpiryDate: "",
      RemainingPax: 1,
      AvgRating: 0.0,
      DateType: "Non-Recurring",
      ContentHTML: "",
      EventDates: [],
      UserID: 0,
    },
    validationSchema: yup.object().shape({
      EventName: yup
        .string()
        .trim()
        .min(3, "Minimum 3 characters.")
        .max(60, "Maximum 60 characters.")
        .required(),

      EventPrice: yup
        .number()
        .integer()
        .min(0, "Minimum 0 SGD")
        .max(10000, "Maximum 10000 SGD")
        .required(),

      FriendPrice: yup
        .number()
        .integer()
        .min(0, "Minimum 0 SGD")
        .max(10000, "Maximum 10000 SGD")
        .required(),

      NTUCPrice: yup
        .number()
        .integer()
        .min(0, "Minimum 0 SGD")
        .max(10000, "Maximum 10000 SGD")
        .required(),

      MaxPax: yup
        .number()
        .integer()
        .min(1, "Minimum 1 person per event")
        .max(200, "Maximum 200 people per event")
        .required(),

      Approval: yup.boolean(),

      ActivityType: yup.string().required(),

      EventLocation: yup
        .string()
        .min(5, "Are you sure this is a proper location?")
        .max(50, "Are you sure this is a proper location?")
        .required(),
      ExpiryDate: yup.date(),
      RemainingPax: yup
        .number()
        .integer()
        .min(1, "Minimum 1 person per event")
        .max(200, "Maximum 200 people per event")
        .required(),
      AvgRating: yup.number(),
      DateType: yup.string().required(),
      ContentHTML: yup.string().required(),
      EventDates: yup.array().min(1, "Please set a date"),
      UserID: yup.number().integer(),
    }),

    onSubmit: async (data) => {
      // Implement the update logic here
      console.log("Update button clicked");
      console.log("Form data:", data);
      console.log("User object:", user);
      console.log("User ID:", user.id);

      if (!formikEvent.isValid) {
        console.error("Form is not valid");
        return;
      }

      // Implement your update logic here
      // Send a PUT request to update the event data
      // ...

      toast.success("Event updated successfully");
      navigate("/");
    },
  });

  // Populate the form fields with existing event data
  useEffect(() => {
    if (eventData) {
      formikEvent.setValues({
        EventName: eventData.EventName,
        EventPrice: eventData.EventPrice,
        FriendPrice: eventData.FriendPrice,
        NTUCPrice: eventData.NTUCPrice,
        MaxPax: eventData.MaxPax,
        Approval: eventData.Approval,
        ActivityType: eventData.ActivityType,
        EventLocation: eventData.EventLocation,
        ExpiryDate: eventData.ExpiryDate,
        RemainingPax: eventData.RemainingPax,
        AvgRating: eventData.AvgRating,
        DateType: eventData.DateType,
        ContentHTML: eventData.ContentHTML,
        EventDates: eventData.EventDates,
        UserID: eventData.UserID,
      });
    }
  }, [eventData, formikEvent]);

  const navigate = useNavigate();

  // ... (rest of your component remains unchanged)

  return (
    <div className="bg-gradient-to-br from-orange-400 to-red-500 py-10">
      <div className="p-5 text-center bg-stone-100 w-7/12 mx-auto rounded-lg drop-shadow-lg shadow-lg">
        <h1 className="text-xl font-medium">Update Event</h1>
        <form
          onSubmit={formikEvent.handleSubmit}
          className="text-lg font-medium"
          encType="multipart/form-data"
        >
          {/* Rest of your form remains unchanged */}
        </form>
      </div>
    </div>
  );
}

export default UpdateEvent;