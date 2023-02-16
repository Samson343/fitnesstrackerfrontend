import React, { useEffect, useState } from "react";
import { callApi } from "../api/apiCalls";

const ActivityPost = () => {
    const [token, setToken] = useState([]);
    const [allActivities, setAllActivities] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const postActivity = async () => {
        try {
            const response = await callApi({
                url: "activities",
                method: "POST",
                token,
                body: {
                    name,
                    description
                }
            })
            await allActivities();
        }
        catch (error) {
            console.error(error);
        }
    }

    const activityName = (event) => {
        setName(event.target.value);
    }

    const descriptionHandler = (event) => {
        setDescription(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        postActivity();
        setName("");
        setDescription("");
        setOpen(false);
    }

    useEffect(() => {
        setToken(localStorage.getItem("token"));
    }, []);

    return (
        <div>
            {
                token ?
                    <div>
                        <button onClick={handleOpen}>Add Activity</button>
                        <div>
                            <form onSubmit={submitHandler}>
                                <h5>Post an activity </h5>
                                <label>Name: </label>
                                <input
                                    type="text"
                                    id="activityName"
                                    onChange={activityName}
                                    value={name}
                                />
                                <br />
                                <label>Description: </label>
                                <textarea
                                    id="description"
                                    onChange={descriptionHandler}
                                    value={description}
                                />
                                <br />
                                <button type="submit">Add</button>
                            </form>
                        </div>
                    </div>
                    : ""
            }
        </div>
    )
}

export default ActivityPost;