import React, { useState, useEffect, useCallback } from "react";
import { callApi } from "../api/apiCalls";
import styles from './ActivityPost.module.css';
import { TextField, Button } from "@mui/material";

const ActivityPost = ({ token }) => {
    const [newActivity, setNewActivity] = useState({ name: "", description: "" });

    const createActivity = useCallback(async () => {
        try {
            const response = await callApi({
                url: "activities",
                method: "POST",
                token,
                body: newActivity
            });

            if (response) {
                setNewActivity({ name: "", description: "" });
            }
        }
        catch (error) {
            console.error(error);
        }
    }, [newActivity, token]);

    useEffect(() => {
        createActivity();
    }, [newActivity, token, createActivity]);

    const changeName = (event) => {
        setNewActivity({ ...newActivity, name: event.target.value });
    };

    const changeDescription = (event) => {
        setNewActivity({ ...newActivity, description: event.target.value });
    };

    const submitHandler = (event) => {
        event.preventDefault();
        createActivity();
    };

    return (
        <div>
            <form onSubmit={submitHandler} className={styles.createForm}>
                <TextField
                    size="small"
                    className={styles.formInputs}
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    value={newActivity.name}
                    onChange={changeName}
                />
                <TextField
                    size="small"
                    className={styles.formInputs}
                    id="outlined-basic"
                    label="Description"
                    variant="outlined"
                    value={newActivity.description}
                    onChange={changeDescription}
                />
                <Button size="small" className={styles.submitButton} type="submit">
                    New Activity
                </Button>
            </form>
        </div>
    )
}

export default ActivityPost;