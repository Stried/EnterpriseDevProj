import { AiOutlineUser } from "react-icons/ai";
import { GrGroup } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import http from "../../http";
import React, { useContext, useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { red } from "@mui/material/colors";
import CustomSelect from "./CustomSelect";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/red.css";
import "./DatePickerStyle.css";
import "./CustomSelectStyle.css";
import UserContext from "../Users/UserContext";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import "./CKEditorStyles.css";
import DOMPurify from "dompurify";
import CurrencyInput from 'react-currency-input-field';
import ReactMarkdown from "react-markdown";
import {
  Box,
  RadioGroup,
  FormControlLabel,
  Button,
  Radio,
  FormControl,
} from "@mui/material";
import { FileInput } from "flowbite-react";
function ApplyEvent() {

  function convertDateTimeToDateOnly(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, "0");
    const day = String(dateTime.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const { user } = useContext(UserContext);

  const [eventImageFile, setEventImageFile] = useState();
  useEffect(() => {
    console.log("EventImageFile:", eventImageFile);
  }, [eventImageFile]);

  const getOneWeekAheadDateTime = () => {
    const currentDate = new Date();
    const oneWeekLater = new Date(
      currentDate.getTime() + 7 * 24 * 60 * 60 * 1000
    );

    oneWeekLater.setHours(0, 0, 0, 0);

    return oneWeekLater;
  };

  const onFileChange = (e) => {
    let file = e.target.files[0];
    if (file) {
        if (file.size > 1024 * 1024) {
            toast.error("Maximum file size is 1MB");
            return;
        }
    }

    let formData = new FormData();
    formData.append("File", file);
    http.post("/file/uploadEventImage", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    })
        .then((res) => {
            console.log(res.data);
            // changed to small 'n' in fileName -> filename
            setEventImageFile(res.data.filename);
        })
        .catch(function (err) {
            console.log(err);
        });
};

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
      ContentHTML: "",
      EventDates: [],
      EventImageFile: "",
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
        .min(0, "Minimum 0 SGD")
        .max(10000, "Maximum 10000 SGD")
        ,

      FriendPrice: yup
        .number()
        .min(0, "Minimum 0 SGD")
        .max(10000, "Maximum 10000 SGD")
        .required()
        ,

      NTUCPrice: yup
        .number()
        .min(0, "Minimum 0 SGD")
        .max(10000, "Maximum 10000 SGD")
        .required()
        ,

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
      AvgRating: yup.number(),
      ContentHTML: yup
      .string()
      .required()
      .min(60, "Are you sure this is enough to describe your event?")
      .max(60000, "Maximum 60000 characters."),
      EventDates: yup.array().min(1, "Please set a date"),
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
      const formattedDates = [];

      for (let i = 0; i < data.EventDates.length; i++) {
        const customDate = data.EventDates[i];

        if (customDate && typeof customDate === "object") {
          const formattedDate = new Date(customDate);

          formattedDates.push(formattedDate);
        } else {
          formattedDates.push(null);
        }
      }

      const sanitizeddata=DOMPurify.sanitize(data.ContentHTML)
      const roundedEventPrice = parseFloat(data.EventPrice).toFixed(2);
      const roundedFriendPrice = parseFloat(data.FriendPrice).toFixed(2);
      const roundedNTUCPrice = parseFloat(data.NTUCPrice).toFixed(2);

      if (eventImageFile) {
          data.EventImageFile = eventImageFile;
          console.log(data.EventImageFile + "Event Image File HERE")
    }

      const formData = {
        EventName: (data.EventName = data.EventName.trim()),
        EventPrice: (data.EventPrice = roundedEventPrice),
        FriendPrice: (data.FriendPrice = roundedFriendPrice),
        NTUCPrice: (data.NTUCPrice = roundedNTUCPrice),
        MaxPax: (data.MaxPax = data.MaxPax),
        Approval: (data.Approval = data.Approval),
        ActivityType: (data.ActivityType = data.ActivityType.trim()),
        EventLocation: (data.EventLocation = data.EventLocation.trim()),
        AvgRating: (data.AvgRating = data.AvgRating),
        ContentHTML: (data.ContentHTML = sanitizeddata),
        EventImageFile: eventImageFile,
        EventDates: formattedDates,
        UserID: user.id,
      };

      if (data.EventDates.length > 0) {
        const maxDate = new Date(
          Math.max(...data.EventDates.map((date) => new Date(date)))
        );

        const formattedMaxDate = maxDate.toISOString().split("T")[0];
        console.log("Formatted Max Date:", formattedMaxDate);

        formData.ExpiryDate = formattedMaxDate;
      }

      console.log(formData);
      await http
        .post("/event/Applications", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            
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

  useEffect(() => {
    console.log("List of Dates:", formikEvent.values.EventDates);
  }, [formikEvent.values.EventDates]);


  useEffect(() => {
    console.log("Is form valid:", formikEvent.isValid);

    if (!formikEvent.isValid) {
      console.log("Form errors:", formikEvent.errors);
    }
  }, [formikEvent.isValid, formikEvent.errors]);

  const navigate = useNavigate();

  const options = [
    { value: "Dine and Wine", label: "Dine and Wine" },
    { value: "Family and Friends", label: "Family and Friends" },
    { value: "Hobbies and Wellness", label: "Hobbies and Wellness" },
    { value: "Sports", label: "Sports" },
    { value: "Adventure", label: "Adventure" },
    { value: "Travel", label: "Travel" },
  ];




  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdn.ckeditor.com/ckeditor5/41.1.0/decoupled-document/ckeditor.js";
    script.async = true;
  
    script.onload = () => {
      DecoupledEditor.create(document.querySelector("#editor"), {
        toolbar: {
          items: [
            "heading",
            "|",
            "bold",
            "italic",
            "strikethrough",
            "link",
            "|",
            "undo",
            "redo",
            "fontsize",
            "alignment",
            "bulletedList",
            "numberedList",
            "todoList",
            "outdent",
            "indent",
          ],
        },
        language: "en",
      })
        .then((editor) => {
          const editorContainer = document.querySelector("#editor");
          editorContainer.style.height = "400px"; 
          editorContainer.style.border = "1px solid black"; 

          const toolbarContainer = document.querySelector("#toolbar-container");

          toolbarContainer.appendChild(editor.ui.view.toolbar.element);
  
          editor.model.document.on("change", () => {
            const content = editor.getData();
            formikEvent.setFieldValue("ContentHTML", content);
          });
        editor => editor.destroy()
        })
        .catch((error) => {
          console.error(error);
        });
    };
  
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!user || !user.id) {
      toast.error("You can only create an event application if you are logged in.");

      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="bg-gradient-to-br from-orange-400 to-red-500 py-10">
      <div className="p-5 text-center bg-stone-100 w-7/12 mx-auto rounded-lg drop-shadow-lg shadow-lg">
      <p className="text-4xl text-center font-medium">Create Event Application</p>
        <form
          onSubmit={formikEvent.handleSubmit}
          className="text-lg font-medium"
          encType="multipart/form-data"
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
          <label htmlFor="friendprice">Entry Price</label>
            <p className="opacity-70 italic">Entry Price for guests</p>
          <CurrencyInput
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
            <CurrencyInput
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
            <CurrencyInput
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
            <p className="opacity-70 italic">What type of event is this?</p>
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
          

          <div>
            <DatePicker
              name="EventDates"
              id="eventdates"
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="Enter Event Date.."
              className="red"
              inputClass="custom-input"
              placeholderText="Select a date"
              value={formikEvent.values.EventDates}
              onChange={(dates) =>
                formikEvent.setFieldValue("EventDates", dates)
              }
              multiple
              minDate={getOneWeekAheadDateTime()}
              plugins={[<TimePicker position="bottom" />, <DatePanel />]}
            />
            {formikEvent.errors.EventDates ? (
              <div className="text-red-400">
                *{formikEvent.errors.EventDates}
              </div>
            ) : null}
          </div>

          <div className="my-4">
          <label htmlFor="eventimagefile">Event Image</label>
          <p className="opacity-70 italic">Upload an image for your event</p>
            <input
                type="file"
                id="EventImageFile"
                name="eventimagefile"
                onChange={onFileChange}
                className="form-input w-full"
            />
        </div>

        

          <div className="my-4">
          <label htmlFor="contenthtml">Enter your event's description</label>
            <p className="opacity-70 italic">
              This will show up on the website!
            </p>
          <div id="toolbar-container" className="w-full"></div>
          <div id="editor" className="bg-white w-full h-96"
          name="ContentHTML"
          onChange={formikEvent.handleChange}
          value={formikEvent.values.ContentHTML}
          
          ></div>
            {formikEvent.errors.ContentHTML ? (
              <div className="text-red-400 mt-3 ">
                *{formikEvent.errors.ContentHTML}
              </div>
            ) : null}
          <div className="my-4">
          </div>

          </div>
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
