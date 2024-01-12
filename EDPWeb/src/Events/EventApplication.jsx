import { Button, Tabs } from "flowbite-react";
import { AiOutlineUser } from "react-icons/ai";
import { GrGroup } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
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
import MarkdownEditor from './MarkDownEditor';
import UserContext from "../Users/UserContext";
import {
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
} from "@mui/material";
function ApplyEvent() {
  function convertDateFormat(dateString) {
    return dateString.replace(/\//g, "-");
  }

  const { user } = useContext(UserContext);


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
      DateType: "",
      ContentHTML: "",
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
      ExpiryDate: yup.date().required(),
      RemainingPax: yup
        .number()
        .integer()
        .min(1, "Minimum 1 person per event")
        .max(200, "Maximum 200 people per event")
        .required(),
      AvgRating: yup.number(),
      DateType: yup.string().required(),
      ContentHTML: yup.string().required(),
      UserID: yup.number().integer(),
    }),
    onSubmit: async (data) => {
      console.log("Submit button clicked");
      console.log("Form data:", data);
      console.log("User object:", user);
      console.log("User ID:", user.id);
      if (!formikEvent.isValid) {
        console.error("Form is not valid");
        return;
      }
      const formData = {
        EventName: (data.EventName = data.EventName.trim()),
        EventPrice: (data.EventPrice = data.EventPrice),
        FriendPrice: (data.FriendPrice = data.FriendPrice),
        NTUCPrice: (data.NTUCPrice = data.EventPrice),
        MaxPax: (data.MaxPax = data.MaxPax),
        Approval: (data.Approval = data.Approval),
        ActivityType: (data.ActivityType = data.ActivityType.trim()),
        EventLocation: (data.EventLocation = data.EventLocation.trim()),
        ExpiryDate: (data.ExpiryDate = convertDateFormat(
          data.ExpiryDate
        ).trim()),
        RemainingPax: (data.RemainingPax = data.MaxPax),
        AvgRating: (data.AvgRating = data.AvgRating),
        DateType: (data.DateType = data.DateType.trim()),
        ContentHTML: (data.ContentHTML = data.ContentHTML),
        UserID: user.id,
      };
      console.log(formData);
      await 
        http.post("/event/Applications", formData, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem(
                  "accessToken"
              )}`, // This is needed for mine for some reason, not part of the practical
          },
      })
        .then((res) => {
          console.log(res.data);
          navigate("/");
        })
        .catch(function (err) {
          console.log(err);

          toast.error(`${err.response.data}`);
        });
    },
  });

  const navigate = useNavigate();

  const options = [
    { value: "Dine and Wine", label: "Dine and Wine" },
    { value: "Family and Friends", label: "Family and Friends" },
    { value: "Hobbies and Wellness", label: "Hobbies and Wellness" },
    { value: "Sports", label: "Sports" },
    { value: "Adventure", label: "Adventure" },
    { value: "Travel", label: "Travel" },
  ];

  const handleContentChange = (content) => {
    formikEvent.setFieldValue('ContentHTML', content);
  };

  const [selectedRadio, setSelectedRadio] = useState("");

  const handleRadioChange = (event) => {
    setSelectedRadio(event.target.value);
    formikEvent.setFieldValue("DateType", event.target.value);
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "size-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  const [selectedValue, setSelectedValue] = React.useState(
    formikEvent.values.DateType
  );

  useEffect(() => {
    setSelectedValue(formikEvent.values.DateType);
  }, [formikEvent.values.DateType]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="bg-gradient-to-br from-orange-400 to-red-500 py-10">
      <div className="p-5 text-center bg-stone-100 w-1/2 mx-auto rounded-lg drop-shadow-lg shadow-lg">
        <h1 className="text-xl font-medium">Event Application</h1>
        <form
          onSubmit={formikEvent.handleSubmit}
          className="text-lg font-medium"
        >
          <div className="my-4">
            <label htmlFor="eventname">Event Name</label>
            <p className="opacity-70 italic">Event Name/Title</p>
            <input
              type="text"
              name="EventName"
              id="eventname"
              onChange={formikEvent.handleChange}
              value={formikEvent.values.EventName}
              className="bg-transparent border-gray-800 border-2 rounded w-1/2 px-3 py-2 my-2 focus:outline-none focus:ring focus:ring-red-400"
            />
            {formikEvent.errors.EventName ? (
              <div className="text-red-400">
                *{formikEvent.errors.EventName}
              </div>
            ) : null}
          </div>

          <div className="my-4">
            <label htmlFor="eventprice">Event Fee</label>
            <p className="opacity-70 italic">Event Entry Fee</p>
            <input
              type="number"
              name="EventPrice"
              id="eventprice"
              onChange={formikEvent.handleChange}
              value={formikEvent.values.EventPrice}
              className="bg-transparent border-gray-800 border-2 rounded w-1/2 px-3 py-2 my-2 focus:outline-none focus:ring focus:ring-red-400"
            />
            {formikEvent.errors.EventPrice ? (
              <div className="text-red-400">
                *{formikEvent.errors.EventPrice}
              </div>
            ) : null}
          </div>

          <div className="my-4">
            <label htmlFor="friendprice">Uplay Friends Price</label>
            <p className="opacity-70 italic">Event Uplay Friends Price</p>
            <input
              type="number"
              name="FriendPrice"
              id="friendprice"
              onChange={formikEvent.handleChange}
              value={formikEvent.values.FriendPrice}
              className="bg-transparent border-gray-800 border-2 rounded w-1/2 px-3 py-2 my-2 focus:outline-none focus:ring focus:ring-red-400"
            />
            {formikEvent.errors.FriendPrice ? (
              <div className="text-red-400">
                *{formikEvent.errors.FriendPrice}
              </div>
            ) : null}
          </div>

          <div className="my-4">
            <label htmlFor="ntucprice">NTUC Membership Price</label>
            <p className="opacity-70 italic">Event NTUC Membership Price</p>
            <input
              type="number"
              name="NTUCPrice"
              id="ntucprice"
              onChange={formikEvent.handleChange}
              value={formikEvent.values.NTUCPrice}
              className="bg-transparent border-gray-800 border-2 rounded w-1/2 px-3 py-2 my-2 focus:outline-none focus:ring focus:ring-red-400"
            />
            {formikEvent.errors.NTUCPrice ? (
              <div className="text-red-400">
                *{formikEvent.errors.NTUCPrice}
              </div>
            ) : null}
          </div>

          <div className="my-4">
            <label htmlFor="maxpax">Max Participants</label>
            <p className="opacity-70 italic">
              Maximum people per event session
            </p>
            <input
              type="text"
              name="MaxPax"
              id="maxpax"
              onChange={formikEvent.handleChange}
              value={formikEvent.values.MaxPax}
              className="bg-transparent border-gray-800 border-2 rounded w-1/2 px-3 py-2 my-2 focus:outline-none focus:ring focus:ring-red-400"
            />
            {formikEvent.errors.MaxPax ? (
              <div className="text-red-400">*{formikEvent.errors.MaxPax}</div>
            ) : null}
          </div>
          <div className="my-4 custom-select-container">
            <label htmlFor="activitytype">Activity Type</label>

            <div className="custom-select">
              <CustomSelect
                value={formikEvent.values.ActivityType}
                onChange={(value) =>
                  formikEvent.setFieldValue("ActivityType", value.value)
                }
                classnames={"input"}
                options={options}
              />
            </div>

            {formikEvent.errors.ActivityType ? (
              <div className="error-message">
                {formikEvent.errors.ActivityType}
              </div>
            ) : null}
          </div>

          <div className="my-4">
            <label htmlFor="eventlocation">Event Location</label>
            <p className="opacity-70 italic">
              Location where the event takes place
            </p>
            <input
              type="text"
              name="EventLocation"
              id="eventlocation"
              onChange={formikEvent.handleChange}
              value={formikEvent.values.EventLocation}
              className="bg-transparent border-gray-800 border-2 rounded w-1/2 px-3 py-2 my-2 focus:outline-none focus:ring focus:ring-red-400"
            />
            {formikEvent.errors.EventLocation ? (
              <div className="text-red-400">
                *{formikEvent.errors.EventLocation}
              </div>
            ) : null}
          </div>

          <div className="my-4">
            <label htmlFor="eventdatetype">Event Date Type</label>
            <p className="opacity-70 italic">
              Is your event recurring? or is it a single one-time event?
            </p>

            <RadioGroup
              id="eventdatetype"
              key="eventdatetype"
              name="DateType"
              value={selectedRadio}
              onChange={handleRadioChange}
              row
            >
              <FormControlLabel
                sx={{
                  border: "2px solid",
                  borderColor:
                    selectedRadio === "Non-Recurring" ? red[400] : "#b3b3b3",
                  borderRadius: "4px",

                  flex: 1,
                }}
                value="Non-Recurring"
                control={
                  <Radio
                    {...controlProps("Non-Recurring")}
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 28,
                        color: red[400],
                        "&.Mui-checked": {
                          color: red[400],
                        },
                      },
                    }}
                  />
                }
                label="Non-Recurring"
              />

              <FormControlLabel
                sx={{
                  border: "2px solid",
                  borderColor:
                    selectedRadio === "Recurring" ? red[400] : "#b3b3b3",
                  borderRadius: "4px",

                  flex: 1,
                }}
                value="Recurring"
                control={
                  <Radio
                    {...controlProps("Recurring")}
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 28,
                        color: red[400],
                        "&.Mui-checked": {
                          color: red[400],
                        },
                      },
                    }}
                  />
                }
                label="Recurring"
              />
            </RadioGroup>
          </div>

          <div>
            <DatePicker
              placeholder="Enter Event Date.."
              className="red"
              inputClass="custom-input"
              placeholderText="Select a date"
              value={formikEvent.values.ExpiryDate}
              onChange={(newDate) =>
                formikEvent.setFieldValue("ExpiryDate", newDate.format())
              }
            />
            {formikEvent.errors.ExpiryDate ? (
              <div className="text-red-600">
                {formikEvent.errors.ExpiryDate}
              </div>
            ) : null}
          </div>

          <div className="my-4">
            <label htmlFor="eventcontent">Content of your webpage</label>
            <p className="opacity-70 italic">
              create how the content of your webpage would be shown
            </p>
            <input
              type="text"
              name="ContentHTML"
              id="eventcontent"
              onChange={formikEvent.handleChange}
              value={formikEvent.values.ContentHTML}
              className="bg-transparent border-gray-800 border-2 rounded w-1/2 px-3 py-2 my-2 focus:outline-none focus:ring focus:ring-red-400"
            />
            {formikEvent.errors.ContentHTML ? (
              <div className="text-red-400">
                {formikEvent.errors.ContentHTML}
              </div>
            ) : null}
          </div>


          <MarkdownEditor onContentChange={handleContentChange} />

          <button
            type="submit"
            className="bg-gradient-to-br from-orange-400 to-red-500 px-3 py-2 rounded-md tracking-wide hover:brightness-90 transition ease-in-out duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
export default ApplyEvent;