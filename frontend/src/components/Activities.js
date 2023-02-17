import React, { useEffect, useState } from "react";
import { callApi } from "../api/apiCalls";
import { TextField, Button } from "@mui/material";
import styles from './Activities.module.css';

//map and display all activites from the activities table
//include a form to create activities that has two inputs - name, and description

const Activities = ({ token }) => {
    const [activities, setActivities] = useState([]);
    const [newActivity, setNewActivity] = useState({ name: '', description: '' });

    const allActivities = async () => {
        try {
            const response = await callApi({
                url: "activities",
                token
            });
            if (response) {
                setActivities(response);
            }
        }
        catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        allActivities();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await callApi({
                url: "activities",
                method: "POST",
                token,
                body: newActivity
            });
            if (response) {
                setNewActivity({ name: '', description: '' });
                setActivities([...activities, response]);
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    const nameChange = (event) => {
        setNewActivity({ ...newActivity, name: event.target.value });
    };

    const descriptionChange = (event) => {
        setNewActivity({ ...newActivity, description: event.target.value });
    };

    return (
        <div className={styles.activities}>
            <form onSubmit={handleSubmit} className={styles.createForm}>
                <TextField
                    size="small"
                    className={styles.formInputs}
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    value={newActivity.name}
                    onChange={nameChange}
                />
                <TextField
                    size="small"
                    className={styles.formInputs}
                    id="outlined-basic"
                    label="Description"
                    variant="outlined"
                    value={newActivity.description}
                    onChange={descriptionChange}
                />
                <Button size="small" className={styles.submitButton} type="submit">
                    New Activity
                </Button>
            </form>
            <div className="styles.MainDiv">
                {activities.map((activity) => (
                    <div key={activity.id} className={styles.Cards}>
                        <h2>{activity.name}</h2>
                        <p>{activity.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Activities;