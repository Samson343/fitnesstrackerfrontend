import React, { useEffect, useState } from "react";
import { callApi } from "../api/apiCalls";
import { TextField, Button } from "@mui/material";
import styles from './Activities.module.css';

//map and display all activites from the activities table
//include a form to create activities that has two inputs - name, and description

const Activities = ({ token }) => {
    const [activities, setActivities] = useState([]);
    const [newActivity, setNewActivity] = useState({ name: '', description: '' });
    const [routines, setRoutines] = useState([]);
    const [selectedActivityId, setSelectedActivityId] = useState([]);

    const allActivities = async () => {
        try {
            const response = await callApi({
                url: "activities",
                token
            });
            if (response) {
                setActivities(response.map((activity) => ({ ...activity, isEditing: false })));
            }
        }
        catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (selectedActivityId) {
            viewRoutines(selectedActivityId);
        }
        allActivities();
    }, [selectedActivityId]);

    const handleSubmit = async (event, id) => {
        event.preventDefault();

        try {
            const response = await callApi({
                url: `activities/${id}`,
                method: "POST",
                token,
                body: newActivity
            });
            if (response) {
                const updatedActivities = activities.map((activity) => {
                    if (activity.id === response.id) {
                        return { ...activity, ...response, isEditing: false };
                    }
                    return activity;
                })
                setNewActivity({ name: '', description: '' });
                setActivities(updatedActivities);
            }
        }
        catch (error) {
            console.error(error);
        }
    };

    const nameChange = (event, id) => {
        const updatedActivities = activities.map((activity) => {
            if (activity.id === id) {
                return { ...activity, name: event.target.value };
            }
            return activity;
        });
        setActivities(updatedActivities);
    };

    const descriptionChange = (event, id) => {
        const updatedActivities = activities.map((activity) => {
            if (activity.id === id) {
                return { ...activity, description: event.target.value };
            }
            return activity;
        });
        setActivities(updatedActivities);
    };

    const handleEdit = (id) => {
        const updatedActivities = activities.map((activity) => {
            if (activity.id === id) {
                return { ...activity, isEditing: true };
            }
            return activity;
        });
        setActivities(updatedActivities);
    };

    const handleCancel = (id) => {
        const updatedActivities = activities.map((activity) => {
            if (activity.id === id) {
                return { ...activity, isEditing: false };
            }
            return activity;
        });
        setActivities(updatedActivities);
    };

    const viewRoutines = async (activityId) => {
        try {
            const response = await callApi({
                url: `activities/${activityId}/routines`,
                method: "GET",
                token
            });
            if (response) {
                setRoutines(response);
                setSelectedActivityId(activityId);
            }
        }
        catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.activities}>
            <form onSubmit={(event) => handleSubmit(event, activities[0].id)} className={styles.createForm}>
                <TextField
                    size="small"
                    className={styles.formInputs}
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    value={newActivity.name}
                    onChange={(event) => setNewActivity({ ...newActivity, name: event.target.value })}
                />
                <TextField
                    size="small"
                    className={styles.formInputs}
                    id="outlined-basic"
                    label="Description"
                    variant="outlined"
                    value={newActivity.description}
                    onChange={(event) => setNewActivity({ ...newActivity, description: event.target.value })}
                />
                <Button size="small" className={styles.submitButton} type="submit">
                    create
                </Button>
            </form>
            <div className="styles.MainDiv" sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                {activities.map((activity) => (
                    <div key={activity.id} className={styles.Cards}>
                        {activity.isEditing ? (
                            <form onSubmit={(event) => handleSubmit(event, activity.id)} className={styles.activityForm}>
                                <TextField
                                    size="small"
                                    className={styles.formInputs}
                                    id="outlined-basic"
                                    label="Name"
                                    variant="outlined"
                                    value={activity.name}
                                    onChange={(event) => nameChange(event, activity.id)}
                                />
                                <TextField
                                    size="small"
                                    className={styles.formInputs}
                                    id="outlined-basic"
                                    label="Description"
                                    variant="outlined"
                                    value={activity.description}
                                    onChange={(event) => descriptionChange(event, activity.id)}
                                />
                                <Button
                                    size="small"
                                    variant="contained"
                                    type="submit"
                                    onClick={() => handleCancel(activity.id)}
                                >
                                    Save
                                </Button>
                                <Button
                                    size="small"
                                    variant="contained"
                                    onClick={() => handleCancel(activity.id)}
                                >
                                    Cancel
                                </Button>
                            </form>
                        ) : (
                            <div className={styles.activity}>
                                <h2>{activity.name}</h2>
                                <h3>{activity.description}</h3>
                                <Button
                                    size="small"
                                    className={styles.editButton}
                                    onClick={() => handleEdit(activity.id)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    size="small"
                                    className={styles.routinesButton}
                                    onClick={() => {
                                        viewRoutines(activity.id);
                                        setSelectedActivityId(activity.id);
                                    }}
                                >
                                    View Routines
                                </Button>
                                {routines.map((routine, index) => (
                                    <div key={index}>
                                        <p>{routine.name}</p>
                                        <p>{routine.description}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div >
    )
}

export default Activities;