import { Button, Tabs } from "flowbite-react";
import { AiOutlineUser } from "react-icons/ai";
import { GrGroup } from "react-icons/gr";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { BubbleMenu, EditorContent, FloatingMenu, useEditor } from '@tiptap/react';
import TextAlign from '@tiptap/extension-text-align';
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
import CurrencyInput from 'react-currency-input-field';
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
      AvgRating: selectedevent.avgRating,
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
        .min(0, "Minimum 0 SGD")
        .max(10000, "Maximum 10000 SGD")
        .required()
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
      ExpiryDate: yup
      .date(),
      AvgRating: yup.number(),
      ContentHTML: yup
      .string()
      .required()
      .min(60, "Are you sure this is enough to describe your event?")
      .max(60000, "Maximum 60000 characters."),
      EventDates: yup.array().min(1, "Please set a date"),

    }),

    onSubmit: async (data, {setFieldError}) => {
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
      const roundedEventPrice = parseFloat(data.EventPrice).toFixed(2);
      const roundedFriendPrice = parseFloat(data.FriendPrice).toFixed(2);
      const roundedNTUCPrice = parseFloat(data.NTUCPrice).toFixed(2);

      console.log("Form data for event dates: "+data.EventDates)
      


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
        ContentHTML: (data.ContentHTML = editor.getHTML().trim()),
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
      if (editor.getHTML().trim() === "<p></p>") {
        setFieldError('ContentHTML', 'Content is required');
        return;
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

    formikEvent.setFieldValue("ContentHTML", content);
  };

  

  const editor = useEditor({
    extensions: [StarterKit, TextAlign.configure({
      types: ['heading', 'paragraph'],
    })],
    content: selectedevent.contentHTML,
    onUpdate: ({ editor }) => {

      handleUpdateContent(editor.getHTML());
    },
  });
  
  useEffect(() => {
    if (editor) {
      editor.commands.setContent(selectedevent.contentHTML);
    }
  }, [editor, selectedevent.contentHTML]);

  const getSelectedHeadingLevel = () => {
    const { active } = editor;
    if (active && active.type.name === 'heading') {
      return active.type.attrs.level;
    }
    return '';
  };

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(formikEvent.values.ContentHTML);
    }
  }, [editor, formikEvent.values.ContentHTML]);

  return (
    <div className="bg-gradient-to-br from-orange-400 to-red-500 py-10">
      <div className="p-5 text-center bg-stone-100 w-7/12 mx-auto rounded-lg drop-shadow-lg shadow-lg">
        <p className="text-4xl text-center font-medium">Event Record Update</p>
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

          <div className="my-4">
          <label htmlFor="eventlocation">Event Dates</label>
            <p className="opacity-70 italic">
              When does your event happen?
            </p>
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
        <div className="my-4">
          <label htmlFor="eventlocation">Event Details</label>
            <p className="opacity-70 italic">
              Create the details, and tell us more about your event
            </p>
          
<div className="prose">
<div className="text-editor-container">

      {editor && (
        <>
<BubbleMenu className="bubble-menu" tippyOptions={{ duration: 100 }} editor={editor}>
  <select
    value={getSelectedHeadingLevel()}
    onChange={(e) => {
      const selectedHeadingLevel = parseInt(e.target.value, 10);
      if (!isNaN(selectedHeadingLevel)) {
        editor.chain().focus().toggleHeading({ level: selectedHeadingLevel }).run();
      }
    }}
  >
    <option value="" disabled>Select Heading</option>
    {[1, 2, 3, 4, 5].map((level) => (
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
              type="button"
    onClick={() => editor.chain().focus().toggleBulletList().run()}
    style={{ color: editor.isActive('bulletList') ? 'blue' : 'inherit' }}
  >
    Bullet
  </button>
  

      <button
            type="button"
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-align-left"><line x1="17" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="17" y1="18" x2="3" y2="18"></line></svg>
      </button>
      <button
            type="button"
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-align-center"><line x1="18" y1="10" x2="6" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="18" y1="18" x2="6" y2="18"></line></svg>
      </button>
      <button
            type="button"
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-align-right"><line x1="21" y1="10" x2="7" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="7" y2="18"></line></svg>
      </button>
      <button
      type="button"
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-align-justify"><line x1="21" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="3" y2="18"></line></svg>
      </button>

</BubbleMenu>
          <div className="tiptap-editor">
          <div className="text-4xl pt-5">Markdown Editor:</div>
            <EditorContent editor={editor} />
          </div>
          {formikEvent.errors.ContentHTML ? (
              <div className="text-red-400">
                *{formikEvent.errors.ContentHTML}
              </div>
            ) : null}
        </>
      )}
     </div>
    </div>
    
    <div className="text-right pr-12">
  <a
    onClick={() => {
      toggleModal(EventId);
    }}
    href="#"
    className="bg-red-600 p-2 px-5 rounded-md text-black hover:bg-red-600 hover:text-white "
  >
    Delete Event Record
  </a>
<span className="pl-8">
  <button
    type="submit"
    className="bg-gradient-to-br from-orange-400 to-red-500 px-3 py-2 rounded-md tracking-wide hover:brightness-90 transition ease-in-out duration-300"
  >
    Submit
  </button>
  </span>
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
      {openModals[EventId] && (
        <button
          onClick={() =>
            deleteEventRecord(`${selectedevent.eventId}`)
          }
          className="px-3 py-2 bg-red-500 hover:bg-red-600 hover:text-white rounded font-medium"
        >
          Delete
        </button>
      )}

      <button
        onClick={() => toggleModal(EventId)}
        className="px-3 py-2 bg-sky-400 hover:bg-sky-600 hover:text-white rounded font-medium"
      >
        Cancel
      </button>
    </Modal.Footer>
  </Modal>
</div>
</div>
        </form>
      </div>
    </div>
  );
}
export default EventRecordUpdate;
