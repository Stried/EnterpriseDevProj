import { Button, Tabs } from "flowbite-react";
import { AiOutlineUser } from "react-icons/ai";
import { GrGroup } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import http from "../../http";
import React, { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomSelect from "./CustomSelect";
import {
    Box,
    Button,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormControl,
  } from "@mui/material";
function ApplyEvent() {
    const navigate = useNavigate();

    const options = [
        { value: "Dine and Wine", label: "Dine and Wine" },
        { value: "Family and Friends", label: "Family and Friends" },
        { value: "Hobbies and Wellness", label: "Hobbies and Wellness" },
        { value: "Sports", label: "Sports" },
        { value: "Adventure", label: "Adventure" },
        { value: "Travel", label: "Travel" }
    ];

    const [selectedRadio, setSelectedRadio] = useState('');

    const handleRadioChange = (event) => {
        setSelectedRadio(event.target.value);
        formikEvent.handleChange(event); // Update Formik state
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
            DateType: "",
            ContentHTML: "",
            UserID: 0, // Assuming UserID should have a default value, you can adjust accordingly
        },
        validationSchema: yup.object().shape({
            EventName: yup
                .string()
                .trim()
                .min(3, "Minimum 3 characters.")
                .max(60, "Maximum 60 characters.")
                .required(),

            EventPrice: yup
                .integer()
                .min(0, "Minimum 0 SGD")
                .max(10000, "Maximum 10000 SGD")
                .required(),

            FriendPrice: yup
                .integer()
                .min(0, "Minimum 0 SGD")
                .max(10000, "Maximum 10000 SGD")
                .required(),

            NTUCPrice: yup
                .integer()
                .min(0, "Minimum 0 SGD")
                .max(10000, "Maximum 10000 SGD")
                .required(),

            MaxPax: yup
                .integer()
                .min(1, "Minimum 1 person per event")
                .max(200, "Maximum 200 people per event")
                .required(),

            Approval: yup
                .boolean(),

            ActivityType: yup
                .string()
                .required(),

            EventLocation: yup
                .string()
                .min(5, "Are you sure this is a proper location?")
                .max(50, "Are you sure this is a proper location?")
                .required(),
            ExpiryDate: yup
                .date()
                .required(),
            RemainingPax: yup
                .integer()
                .min(1, "Minimum 1 person per event")
                .max(200, "Maximum 200 people per event")
                .required(),
            AvgRating: yup
                .float(),
            DateType: yup
                .string()
                .required(),
            ContentHTML: yup
                .string()
                .required(),
            UserID: yup
                .integer()
        }),
        onSubmit: async (data) => {

            formData = {       //formData not glowing, dk wtf is wrong
                EventName: (data.EventName = data.EventName.trim()),
                EventPrice: (data.EventPrice = data.EventPrice.trim()),
                FriendPrice: (data.FriendPrice = data.FriendPrice.trim()),
                NTUCPrice: (data.NTUCPrice = data.EventPrice.trim()),
                MaxPax: (data.MaxPax = data.MaxPax.trim()),
                Approval: (data.Approval = data.Approval.trim()),
                ActivityType: (data.ActivityType = data.ActivityType.trim()),
                EventLocation: (data.EventLocation = data.EventLocation.trim()),
                ExpiryDate: (data.ExpiryDate = data.ExpiryDate.trim()),
                RemainingPax: (data.RemainingPax = data.MaxPax.trim()),
                AvgRating: (data.AvgRating = data.AvgRating.trim()),
                DateType: (data.DateType = data.DateType.trim()),
                ContentHTML: (data.ContentHTML = data.ContentHTML.trim()),
                UserID: (data.UserID = data.UserID.trim()),
            };
            await http
                .post("/event/Application", formData)
                .then((res) => {
                    console.log(res.data)
                    navigate("/")
                })
                .catch(function (err) {
                    console.log(err)
                    toast.error(`${err.response.data}`);
                });


        },
    });

    return (
        <div className="bg-gradient-to-br from-orange-400 to-red-500 py-10">
            <div className="p-5 text-center bg-stone-100 w-1/2 mx-auto rounded-lg drop-shadow-lg shadow-lg">
                <h1 className="text-xl font-medium">
                    Corporate Account Registration
                </h1>
                <form
                    onSubmit={formikEvent.handleSubmit}
                    className="text-lg font-medium"
                >
                    <div className="my-4">
                        <label htmlFor="eventname">Event Name</label>
                        <p className="opacity-70 italic">
                            Event Name/Title
                        </p>
                        <input
                            type="text"
                            name="EventName"
                            id="EventName"
                            onChange={formikEvent.handleChange}
                            value={formikEvent.values.EventName}
                            className="bg-transparent border-gray-800 border-2 rounded w-1/2 px-3 py-2 my-2 focus:outline-none focus:ring focus:ring-red-400"
                        />
                        {formikIndiv.errors.EventName ? (
                            <div className="text-red-400">
                                *{formikEvent.errors.EventName}
                            </div>
                        ) : null}
                    </div>

                    <div className="my-4">
                        <label htmlFor="eventprice">Event Fee</label>
                        <p className="opacity-70 italic">
                            Event Entry Fee
                        </p>
                        <input
                            type="number"
                            name="EventPrice"
                            id="EventPrice"
                            onChange={formikEvent.handleChange}
                            value={formikEvent.values.EventPrice}
                            className="bg-transparent border-gray-800 border-2 rounded w-1/2 px-3 py-2 my-2 focus:outline-none focus:ring focus:ring-red-400"
                        />
                        {formikIndiv.errors.EventPrice ? (
                            <div className="text-red-400">
                                *{formikEvent.errors.EventPrice}
                            </div>
                        ) : null}
                    </div>

                    <div className="my-4">
                        <label htmlFor="friendprice">Uplay Friends Price</label>
                        <p className="opacity-70 italic">
                            Event Uplay Friends Price
                        </p>
                        <input
                            type="number"
                            name="FriendPrice"
                            id="FriendPrice"
                            onChange={formikEvent.handleChange}
                            value={formikEvent.values.FriendPrice}
                            className="bg-transparent border-gray-800 border-2 rounded w-1/2 px-3 py-2 my-2 focus:outline-none focus:ring focus:ring-red-400"
                        />
                        {formikIndiv.errors.EventName ? (
                            <div className="text-red-400">
                                *{formikEvent.errors.FriendPrice}
                            </div>
                        ) : null}
                    </div>

                    <div className="my-4">
                        <label htmlFor="ntucprice">NTUC Membership Price</label>
                        <p className="opacity-70 italic">
                            Event NTUC Membership Price
                        </p>
                        <input
                            type="number"
                            name="NTUCPrice"
                            id="NTUCPrice"
                            onChange={formikEvent.handleChange}
                            value={formikEvent.values.NTUCPrice}
                            className="bg-transparent border-gray-800 border-2 rounded w-1/2 px-3 py-2 my-2 focus:outline-none focus:ring focus:ring-red-400"
                        />
                        {formikIndiv.errors.NTUCPrice ? (
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
                            id="MaxPax"
                            onChange={formikEvent.handleChange}
                            value={formikEvent.values.MaxPax}
                            className="bg-transparent border-gray-800 border-2 rounded w-1/2 px-3 py-2 my-2 focus:outline-none focus:ring focus:ring-red-400"
                        />
                        {formikIndiv.errors.MaxPax ? (
                            <div className="text-red-400">
                                *{formikEvent.errors.MaxPax}
                            </div>
                        ) : null}
                    </div>

                    <div className="my-4">
                        <label htmlFor="activitytype">Activity Type</label>

                        <CustomSelect
                            value={formik.values.ActivityType}
                            onChange={(value) => formik.setFieldValue("activitytype", value.value)}
                            classnames={"input"}
                            options={options}
                        />
                        {formik.errors.ActivityType ? (
                            <div classnames="error">{formik.errors.ActivityType}</div>
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
                            id="EventLocation"
                            onChange={formikEvent.handleChange}
                            value={formikEvent.values.EventLocation}
                            className="bg-transparent border-gray-800 border-2 rounded w-1/2 px-3 py-2 my-2 focus:outline-none focus:ring focus:ring-red-400"
                        />
                        {formikIndiv.errors.EventLocation ? (
                            <div className="text-red-400">
                                *{formikEvent.errors.EventLocation}
                            </div>
                        ) : null}
                    </div>

                    <div className="my-4">
                        <label htmlFor="expirydate">Expiry Date</label>
                        <p className="opacity-70 italic">
                            When does your event finally end? When is its last session?
                        </p>
                        <input
                            type="text"
                            name="EventLocation"
                            id="EventLocation"
                            onChange={formikEvent.handleChange}
                            value={formikEvent.values.EventLocation}
                            className="bg-transparent border-gray-800 border-2 rounded w-1/2 px-3 py-2 my-2 focus:outline-none focus:ring focus:ring-red-400"
                        />
                        {formikIndiv.errors.EventLocation ? (
                            <div className="text-red-400">
                                *{formikEvent.errors.EventLocation}
                            </div>
                        ) : null}
                    </div>

                    <div className="my-4">
                        <label htmlFor="eventdatetype">Event Date Type</label>
                        <p className="opacity-70 italic">
                            Is your event recurring? or is it a single one time event?
                        </p>

                        <RadioGroup
                            key="eventdatetype"
                            name="DateType"
                            value={selectedRadio}
                            onChange={handleRadioChange}
                            className="ml-2"
                        >
                            <FormControlLabel
                                sx={{
                                    border: "2px solid",
                                    borderColor:
                                        selectedRadio === "Non-Recurring" ? green[500] : "#b3b3b3",
                                    borderRadius: "4px",
                                    padding: "8px",
                                    marginBottom: "8px",
                                    display: "block",
                                }}
                                value="Non-Recurring"
                                control={
                                    <Radio
                                        {...controlProps("Non-Recurring")}
                                        sx={{
                                            "& .MuiSvgIcon-root": {
                                                fontSize: 28,
                                                color: green[600],
                                                "&.Mui-checked": {
                                                    color: green[500],
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
                                        selectedRadio === "Recurring" ? green[500] : "#b3b3b3",
                                    borderRadius: "4px",
                                    padding: "8px",
                                    marginBottom: "8px",
                                    display: "block",
                                }}
                                value="Recurring"
                                control={
                                    <Radio
                                        {...controlProps("Recurring")}
                                        sx={{
                                            "& .MuiSvgIcon-root": {
                                                fontSize: 28,
                                                color: green[600],
                                                "&.Mui-checked": {
                                                    color: green[500],
                                                },
                                            },
                                        }}
                                    />
                                }
                                label="Recurring"
                            />
                        </RadioGroup>

                        <input
                            type="text"
                            name="EventLocation"
                            id="EventLocation"
                            onChange={formikEvent.handleChange}
                            value={formikEvent.values.EventLocation}
                            className="bg-transparent border-gray-800 border-2 rounded w-1/2 px-3 py-2 my-2 focus:outline-none focus:ring focus:ring-red-400"
                        />
                        {formikIndiv.errors.EventLocation ? (
                            <div className="text-red-400">
                                *{formikEvent.errors.EventLocation}
                            </div>
                        ) : null}
                    </div>


                </form>
            </div>
        </div>
    );

}
export default ApplyEvent