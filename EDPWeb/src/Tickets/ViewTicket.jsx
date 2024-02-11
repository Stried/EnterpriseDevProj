import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../http";
import UserContext from "./../Users/UserContext";

import { Badge, Avatar } from "flowbite-react";
import { Button, Timeline } from "flowbite-react";
import { useFormik } from "formik";
import * as yup from "yup";
import dayjs from "dayjs";

import { RiDeleteBinFill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";

function ViewTicket() {
    let { ticketId } = useParams();
    const { user } = useContext(UserContext);
    const [ticketDetails, setTicketDetails] = useState("");
    const [ticketImages, setTicketImages] = useState([]);
    const [userAcc, setUserAcc] = useState("");
    const [flavourText, setFlavourText] = useState("");
    const [comments, setComments] = useState([]);
    const [editComment, setEditComment] = useState("");
    const [editCommentId, setEditCommentId] = useState(0);

    useEffect(() => {
        http.get(`/ticket/getCommentsOnTicket/${ticketId}`)
            .then((res) => {
                setComments(res.data);
                console.log(res.data);
            })
            .catch(function (err) {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        http.get(`/ticket/getOneTicket/${ticketId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((res) => {
                setTicketDetails(res.data);

                setTicketImages(res.data.attachedFilename.split(","));
            })
            .catch(function (err) {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        const flavourText = [
            "needs assistance navigating through the digital labyrinth.",
            "is seeking answers in the realm of zeros and ones.",
            "embarks on a journey through the digital cosmos.",
            "summons the digital spirits for guidance.",
            "dives into the sea of code seeking enlightenment.",
            "ventures into the digital wilderness in search of knowledge.",
            "is lost in the binary wilderness.",
            "seeks wisdom amidst the digital chaos.",
            "strives to decode the mysteries of technology.",
            "wanders the digital landscape in search of solutions.",
            "embarks on a quest to conquer the digital realm.",
            "unleashes their curiosity in the digital domain.",
            "seeks the wisdom of the digital elders.",
            "plunges into the depths of cyberspace seeking enlightenment.",
            "explores the digital frontier in search of enlightenment.",
            "sets sail on the digital sea in pursuit of knowledge.",
            "delves into the digital archives in search of answers.",
            "enters the digital realm in search of truth.",
            "embraces the digital journey in pursuit of wisdom.",
            "unravels the mysteries of the digital world.",
            "braves the digital wilderness in pursuit of enlightenment.",
            "confronts the challenges of the digital age with courage.",
            "strides boldly into the digital future.",
            "immerses themselves in the digital world seeking understanding.",
            "challenges the digital unknown with determination.",
            "embraces the digital adventure with zeal.",
            "seeks guidance in the labyrinth of code.",
            "ventures forth into the digital expanse.",
            "unlocks the secrets of the digital universe.",
            "navigates the digital labyrinth with skill and determination.",
            "tackles the digital challenges head-on.",
            "explores the digital frontier with courage and curiosity.",
            "embarks on a digital odyssey in search of wisdom.",
            "dances with the digital spirits in pursuit of knowledge.",
            "wanders the digital wilderness with purpose.",
            "unravels the mysteries of the digital cosmos.",
            "plumbs the depths of the digital ocean seeking enlightenment.",
            "seeks enlightenment in the digital ether.",
            "immerses themselves in the digital tapestry of life.",
            "unleashes their creativity in the digital realm.",
            "channels their inner digital warrior in pursuit of truth.",
            "embraces the digital revolution with open arms.",
            "challenges the boundaries of the digital world.",
            "dives deep into the digital matrix in search of answers.",
            "taps into the digital zeitgeist in pursuit of understanding.",
            "rides the digital wave in pursuit of enlightenment.",
            "charts a course through the digital cosmos.",
            "weaves their own digital destiny.",
            "boldly goes where no digital explorer has gone before.",
            "pioneers the digital landscape with courage and determination.",
            "plumbs the depths of the digital ocean for knowledge.",
            "navigates the digital maze with skill and precision.",
            "confronts the digital challenges with ingenuity and determination.",
            "embraces the digital adventure with gusto.",
            "dives headfirst into the digital fray.",
            "challenges the digital status quo with innovative thinking.",
            "pushes the boundaries of the digital frontier.",
            "treads boldly in the digital realm.",
            "weaves their own digital narrative.",
            "writes their own digital destiny.",
            "ventures forth into the digital unknown.",
            "sails the digital seas in search of enlightenment.",
            "delves deep into the digital archives.",
            "taps into the digital hive mind for answers.",
            "unlocks the secrets of the digital cosmos.",
            "confronts the digital conundrum with determination.",
            "braves the digital storm with courage and conviction.",
            "dives into the digital rabbit hole.",
            "embraces the digital revolution with open eyes and open heart.",
            "dances with the digital spirits under the light of the binary moon.",
            "channels their inner digital guru in pursuit of wisdom.",
            "plumbs the depths of the digital well for inspiration.",
            "unravels the mysteries of the digital universe with determination.",
            "charts a course through the digital wilderness with skill and precision.",
            "seeks the wisdom of the digital elders with reverence and respect.",
            "confronts the digital dragon with courage and bravery.",
            "tackles the digital challenge head-on with determination.",
            "is stewpee and requires helpee.",
            "embraces the digital adventure with open arms.",
            "channels their inner digital sage in pursuit of enlightenment.",
            "rides the digital wave with skill and finesse.",
            "weaves their own digital tapestry with creativity and imagination.",
            "dives deep into the digital ocean in search of treasure.",
            "navigates the digital maze with courage and determination.",
            "plumbs the depths of the digital cosmos for answers.",
            "treads boldly in the digital wilderness.",
            "braves the digital storm with determination and perseverance.",
            "dives into the digital abyss in search of truth.",
            "embraces the digital journey with open eyes and open mind.",
            "confronts the digital challenge with ingenuity and creativity.",
            "pushes the boundaries of the digital frontier with courage and determination.",
            "weaves their own digital destiny with skill and precision.",
            "ventures forth into the digital unknown with courage and bravery.",
            "sails the digital seas in search of adventure.",
            "delves deep into the digital labyrinth in pursuit of knowledge.",
            "taps into the digital zeitgeist for inspiration and insight.",
            "unlocks the secrets of the digital universe with determination and perseverance.",
            "confronts the digital challenge head-on with courage and conviction.",
        ];

        const randomIndex = Math.floor(Math.random() * flavourText.length);
        const chosenFlavourText = flavourText[randomIndex];

        setFlavourText(chosenFlavourText);
    });

    useEffect(() => {
        http.get(`/user/${ticketDetails.userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((res) => {
                setUserAcc(res.data);
            })
            .catch(function (err) {
                console.log(err);
            });
    }, [ticketDetails]);

    const formikComment = useFormik({
        initialValues: {
            CommentBody: "",
            TicketStatus: "Open",
        },
        validationSchema: yup.object().shape({
            CommentBody: yup
                .string()
                .min(3, "Comment must have at least 3 characters.")
                .max(500, "Comments must have at most 500 characters.")
                .required(),
            TicketStatus: yup.string(),
        }),
        onSubmit: async (data) => {
            const formData = {
                CommentBody: data.CommentBody.toString().trim(),
            };

            http.post(`/ticket/commentOnTicket/${ticketId}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
            })
                .then((res) => {
                    console.log(res.status);
                    http.put(
                        `/ticket/updateTicketStatus/${ticketId}`,
                        formTicketStatus,
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem(
                                    "accessToken"
                                )}`,
                            },
                        }
                    )
                        .then((res) => {
                            console.log(res.status);
                            window.location.reload();
                        })
                        .catch(function (err) {
                            console.log(err);
                        });
                    
                })
                .catch(function (err) {
                    console.log(err);
                });

            const formTicketStatus = {
                TicketStatus: data.TicketStatus.trim(),
            };
            console.log(data.TicketStatus);

            
        },
    });

    const formikCommentEdit = useFormik({
        enableReinitialize: true,
        initialValues: {
            CommentBody: editComment,
        },
        validationSchema: yup.object().shape({
            CommentBody: yup
                .string()
                .min(3, "Comment must have at least 3 characters.")
                .max(500, "Comments must have at most 500 characters.")
                .required(),
        }),
        onSubmit: async (data) => {
            const formData = {
                CommentBody: data.CommentBody.toString().trim(),
            };

            await http
                .put(`/ticket/updateComment/${editCommentId}`, formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                })
                .then((res) => {
                    console.log(res.status);
                    window.location.reload();
                })
                .catch(function (err) {
                    console.log(err);
                });
        },
    });

    const updateComment = (commentId, commentDetails) => {
        setEditCommentId(commentId);
        setEditComment(commentDetails);
    };

    const deleteComment = (commentId) => {
        http.delete(`/ticket/deleteComment/${commentId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((res) => {
                window.location.reload();
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    return (
        <div className="bg-gradient-to-br from-gray-800 to-red-700 py-10">
            {ticketDetails && (
                <div className="space-y-10">
                    <div className="mx-auto  w-2/3 rounded-md text-blue-950 bg-gray-100 p-10">
                        <h2 className="text-md flex mb-4">
                            <div className="">
                                <Avatar
                                    rounded
                                    size={"md"}
                                    className=""
                                    img={userAcc.imageFile}
                                />
                            </div>
                            <p className="text-center font-medium my-auto ml-3 text-md">
                                <span className="text-sky-700">
                                    {userAcc.name}
                                </span>{" "}
                                {flavourText}
                            </p>
                        </h2>
                        <h1 className="text-2xl font-semibold">
                            {ticketDetails.ticketHeader}
                        </h1>
                        <p className="text-lg mb-4 flex">
                            Status:{" "}
                            {ticketDetails.ticketStatus.toLowerCase() ==
                                "open" && (
                                <Badge
                                    color="indigo"
                                    className="w-fit text-sm my-auto mx-2"
                                >
                                    Open
                                </Badge>
                            )}
                            {ticketDetails.ticketStatus.toLowerCase() ==
                                "closed" && (
                                <Badge
                                    color="failure"
                                    className="w-fit text-sm my-auto mx-2"
                                >
                                    Closed
                                </Badge>
                            )}
                            {ticketDetails.ticketStatus.toLowerCase() ==
                                "pending" && (
                                <Badge
                                    color="warning"
                                    className="w-fit text-sm my-auto mx-2"
                                >
                                    Pending
                                </Badge>
                            )}
                        </p>
                        <p className="text-sky-700">
                            <span className="mr-1 text-blue-950">Filed</span>
                            {dayjs(ticketDetails.createdAt).format(
                                "DD MMM YYYY, h:mma"
                            )}
                        </p>

                        <p className="text-lg font-medium mt-5">
                            Issue Description
                        </p>
                        <p className="text-md">{ticketDetails.ticketBody}</p>
                        <div className="overflow-x-auto mx-auto my-10 flex flex-row h-[40vh] space-x-2">
                            {ticketImages &&
                                ticketImages.map((ticketImage, i) => {
                                    return (
                                        <img
                                            key={i}
                                            className="flex-auto object-contain max-h-full"
                                            src={`${
                                                import.meta.env
                                                    .VITE_FILE_BASE_URL
                                            }${ticketImage}`}
                                            alt="Image"
                                        />
                                    );
                                })}
                        </div>
                    </div>

                    {comments &&
                        comments.map((comments, i) => {
                            return (
                                <div className="mx-auto w-2/3 rounded-md text-blue-950 bg-gray-100 px-10 py-5">
                                    {editComment == "" && (
                                        <div className="">
                                            <h2 className="text-md flex mb-4">
                                                <div className="">
                                                    <Avatar
                                                        rounded
                                                        size={"md"}
                                                        className=""
                                                        img={
                                                            comments.user
                                                                .imageFile
                                                        }
                                                    />
                                                </div>
                                                <p className="text-left font-medium my-auto ml-3 text-md grow">
                                                    <span className="text-sky-700">
                                                        {comments.user.name}
                                                    </span>{" "}
                                                    &#183;{" "}
                                                    {user.id ==
                                                        comments.user.id && (
                                                        <span className="">
                                                            You
                                                        </span>
                                                    )}
                                                    {user.id !=
                                                        comments.user.id && (
                                                        <span className="">
                                                            {
                                                                comments.user
                                                                    .userRole
                                                            }
                                                        </span>
                                                    )}
                                                </p>

                                                {user.id ==
                                                    comments.user.id && (
                                                    <div className="flex">
                                                        <FaEdit
                                                            onClick={() => {
                                                                updateComment(
                                                                    comments.id,
                                                                    comments.commentBody
                                                                );
                                                            }}
                                                            className="mx-3 my-auto text-xl cursor-pointer"
                                                        />
                                                        <RiDeleteBinFill
                                                            onClick={() => {
                                                                deleteComment(
                                                                    comments.id
                                                                );
                                                            }}
                                                            className="my-auto text-xl text-red-500 cursor-pointer"
                                                        />
                                                    </div>
                                                )}
                                            </h2>
                                            <pre className="whitespace-pre-wrap font-sans">
                                                {comments.commentBody}
                                            </pre>
                                            <p className="flex flex-row-reverse mt-7 text-sky-700">
                                                {dayjs(
                                                    comments.createdAt
                                                ).format("DD MMM YYYY, h:mma")}
                                            </p>
                                        </div>
                                    )}

                                    {editComment != "" && (
                                        <form
                                            onSubmit={
                                                formikCommentEdit.handleSubmit
                                            }
                                            action=""
                                        >
                                            <div className="mb-4">
                                                <label
                                                    htmlFor="CommentBody"
                                                    className="block text-sm font-semibold mb-2"
                                                >
                                                    Fixing some typos and
                                                    misinformation..
                                                </label>
                                                <textarea
                                                    id="CommentBody"
                                                    name="CommentBody"
                                                    onChange={
                                                        formikCommentEdit.handleChange
                                                    }
                                                    onBlur={
                                                        formikCommentEdit.handleBlur
                                                    }
                                                    value={
                                                        formikCommentEdit.values
                                                            .CommentBody
                                                    }
                                                    className="form-textarea w-full rounded-md"
                                                ></textarea>
                                                {formikCommentEdit.touched
                                                    .CommentBody &&
                                                formikCommentEdit.errors
                                                    .CommentBody ? (
                                                    <div className="text-red-500 text-sm mt-1">
                                                        {
                                                            formikCommentEdit
                                                                .errors
                                                                .CommentBody
                                                        }
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div className="w-full flex flex-row-reverse">
                                                <button
                                                    type="submit"
                                                    className="px-3 py-2 bg-slate-800 font-medium text-white hover:bg-slate-600 transition duration-300 ease-in-out rounded-md"
                                                >
                                                    Update Comment
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            );
                        })}

                    {ticketDetails.ticketStatus.toLowerCase() != "closed" && (
                        <div className="mx-auto  w-2/3 rounded-md text-blue-950 bg-gray-100 p-10">
                            <form
                                onSubmit={formikComment.handleSubmit}
                                action=""
                            >
                                <div className="mb-4">
                                    <label
                                        htmlFor="CommentBody"
                                        className="block text-sm font-semibold mb-2"
                                    >
                                        How will you respond?
                                    </label>
                                    {user.userRole == "Administrator" && (
                                        <select
                                            id="TicketStatus"
                                            name="TicketStatus"
                                            onChange={
                                                formikComment.handleChange
                                            }
                                            onBlur={formikComment.handleBlur}
                                            value={
                                                formikComment.values
                                                    .TicketStatus
                                            }
                                            className="form-select w-full rounded-md my-2"
                                        >
                                            <option value="Open">Open</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Closed">Closed</option>
                                        </select>
                                    )}
                                    <textarea
                                        id="CommentBody"
                                        name="CommentBody"
                                        onChange={formikComment.handleChange}
                                        onBlur={formikComment.handleBlur}
                                        value={formikComment.values.CommentBody}
                                        className="form-textarea w-full rounded-md"
                                        placeholder="Enter comment here"
                                    ></textarea>
                                    {formikComment.touched.CommentBody &&
                                    formikComment.errors.CommentBody ? (
                                        <div className="text-red-500 text-sm mt-1">
                                            {formikComment.errors.CommentBody}
                                        </div>
                                    ) : null}
                                </div>
                                <div className="w-full flex flex-row-reverse">
                                    <button
                                        type="submit"
                                        className="px-3 py-2 bg-slate-800 font-medium text-white hover:bg-slate-600 transition duration-300 ease-in-out rounded-md"
                                    >
                                        Add Comment
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default ViewTicket;
