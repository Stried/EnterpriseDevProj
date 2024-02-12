import { Button, Tabs } from "flowbite-react";
import { AiOutlineUser } from "react-icons/ai";
import { GrGroup } from "react-icons/gr";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { BubbleMenu, EditorContent, FloatingMenu, useEditor } from '@tiptap/react';

import StarterKit from '@tiptap/starter-kit';
import './TextEditor.css'; 
import http from "../../http";
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "flowbite-react";
import DOMPurify from "dompurify";
import CustomSelect from "./CustomSelect";
import DatePicker from "react-multi-date-picker";
import UserContext from "../Users/UserContext";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import "./CKEditorStyles.css";
import 'react-calendar/dist/Calendar.css';
import { red } from "@mui/material/colors";
import "react-multi-date-picker/styles/colors/red.css";
import "./DatePickerStyle.css";
import "./CustomSelectStyle.css";
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


function EventRecordUpdate() {
  let { EventId } = useParams();

  const [isCardShifted, setIsCardShifted] = useState(false);

  const handleToggle = () => {
    setIsCardShifted(!isCardShifted);
  };

  const [openModals, setOpenModals] = useState([]);
  const [selectedevent, setevent] = useState("");
  const toggleModal = (index) => {
    setOpenModals((prevOpenModals) => {
      const updatedModals = [...prevOpenModals];
      updatedModals[index] = !updatedModals[index];
      return updatedModals;
    });
  };

  const [tiptapContent, setTiptapContent] = useState("");

  const deleteEventRecord = (EventId) => {
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
        console.log(selectedevent);
        console.log("The Event being viewed is " + EventId);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [EventId]);

  function extractDatetimeList(eventList) {
    if (!Array.isArray(eventList)) {
      console.error("Input is not an array");
      return [];
    }
    
    const datetimeList = eventList.map((event) =>
      event.dateOfEvent.replace("T", " ")
    );
  
    return datetimeList;
  }

  const datetimeList = extractDatetimeList(selectedevent.dates);


  const formikEvent = useFormik({
  enableReinitialize: true,
  initialValues: {
      EventName: selectedevent.eventName,
      EventPrice: selectedevent.eventPrice,
      FriendPrice: selectedevent.friendPrice,
      NTUCPrice: selectedevent.ntucPrice,
      MaxPax: selectedevent.maxPax,
      Approval: selectedevent.approval,
      ActivityType: selectedevent.activityType,
      EventLocation: selectedevent.eventLocation,
      ExpiryDate: selectedevent.expiryDate,
      RemainingPax: selectedevent.remainingPax,
      AvgRating: selectedevent.avgRating,
      DateType: selectedevent.dateType,
      ContentHTML: selectedevent.contentHTML,
      EventDates: datetimeList,
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

    }),

    onSubmit: async (data) => {
      console.log("Submit button clicked");
      console.log("Form data:", data);


      if (!formikEvent.isValid) {
        console.error("Form is not valid");
        return;
      }
      const formattedDates = data.EventDates.map((customDate) => {
        const trimmedDate = typeof customDate === 'string' ? customDate.trim() : customDate;
        return trimmedDate ? new Date(trimmedDate) : null;
      });


console.log("Form data for event dates: "+data.EventDates)
      

      const formData = {
        EventName: (data.EventName = data.EventName.trim()),
        EventPrice: (data.EventPrice = data.EventPrice),
        FriendPrice: (data.FriendPrice = data.FriendPrice),
        NTUCPrice: (data.NTUCPrice = data.EventPrice),
        MaxPax: (data.MaxPax = data.MaxPax),
        Approval: (data.Approval = data.Approval),
        ActivityType: (data.ActivityType = data.ActivityType.trim()),
        EventLocation: (data.EventLocation = data.EventLocation.trim()),
        RemainingPax: (data.RemainingPax = data.MaxPax),
        AvgRating: (data.AvgRating = data.AvgRating),
        DateType: (data.DateType = data.DateType.trim()),
        ContentHTML: (data.ContentHTML = data.ContentHTML),
        EventDates: formattedDates,
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
        .put(`/event/UpdateEvent/${EventId}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
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

  const [selectedRadio, setSelectedRadio] = useState("Non-Recurring");

  const handleRadioChange = (event) => {
    setSelectedRadio(event.target.value);
    formikEvent.setFieldValue("DateType", event.target.value);
  };

  const controlProps = (item) => ({
    checked: selectedRadio === item,
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

  const handleUpdateContent = (content) => {
    // Update the state or perform any actions with the updated content
    setTiptapContent(content);
  };

  

  const editor = useEditor({
    extensions: [StarterKit],
    content: selectedevent.contentHTML,
    onUpdate: ({ editor }) => {
      // Handle content updates here
      onUpdateContent(editor.getHTML());
    },
  });
  
  useEffect(() => {
    if (editor) {
      editor.commands.setContent(selectedevent.contentHTML);
    }
  }, [editor, selectedevent.contentHTML]);
  return (
    <div className="bg-gradient-to-br from-orange-400 to-red-500 py-10">
      <div className="p-5 text-center bg-stone-100 w-7/12 mx-auto rounded-lg drop-shadow-lg shadow-lg">
        <h1 className="text-xl font-medium">Event Application</h1>
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

          <div className="pb-96">
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
              plugins={[<TimePicker position="bottom" />, <DatePanel />]}
            />
            {formikEvent.errors.EventDates ? (
              <div className="text-red-400">
                *{formikEvent.errors.EventDates}
              </div>
            ) : null}
          </div>
<div className="prose">
<div className="text-editor-container">
      {editor && (
        <>

<BubbleMenu className="bubble-menu" tippyOptions={{ duration: 100 }} editor={editor}>
  <select
    onChange={(e) => {
      const selectedHeadingLevel = parseInt(e.target.value, 10);
      if (!isNaN(selectedHeadingLevel)) {
        editor.chain().focus().toggleHeading({ level: selectedHeadingLevel }).run();
      }
    }}
  >
    <option value="" disabled>Select Heading</option>
    {[1, 2, 3, 4, 5, 6].map((level) => (
      <option
        key={level}
        value={level}
        className={editor.isActive('heading', { level }) ? 'is-active' : ''}
      >
        Heading {level}
      </option>
    ))}
  </select>

  <button
    type="button"
    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
    style={{ color: editor.isActive('heading', { level: 1 }) ? 'blue' : 'inherit' }}
  >
    H1
  </button>
  <button
    type="button"
    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
    style={{ color: editor.isActive('heading', { level: 2 }) ? 'blue' : 'inherit' }}
  >
    H2
  </button>
  <button
    type="button"
    onClick={() => editor.chain().focus().toggleBold().run()}
    style={{ color: editor.isActive('bold') ? 'blue' : 'inherit' }}
  >
    Bold
  </button>
  <button
    type="button"
    onClick={() => editor.chain().focus().toggleItalic().run()}
    style={{ color: editor.isActive('italic') ? 'blue' : 'inherit' }}
  >
    Italic
  </button>
  <button
    type="button"
    onClick={() => editor.chain().focus().toggleStrike().run()}
    style={{ color: editor.isActive('strike') ? 'blue' : 'inherit' }}
  >
    Strike
  </button>
  <button
    onClick={() => editor.chain().focus().toggleBulletList().run()}
    style={{ color: editor.isActive('bulletList') ? 'blue' : 'inherit' }}
  >
    Bullet
  </button>
</BubbleMenu>



          <div className="tiptap-editor">
            <EditorContent editor={editor} />
          </div>
        </>
      )}
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
export default EventRecordUpdate;
