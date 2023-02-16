import React, { useEffect, useState } from "react";
import { callApi } from "../api/apiCalls";
import styles from './Activities.module.css';

//map and display all activites from the activities table
//include a form to create activities that has two inputs - name, and description

const Activities = ({token}) => {
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
    }

    const descriptionChange = (event) => {
        setNewActivity({ ...newActivity, description: event.target.value });
    }

    return (
        <div className={styles.MainDiv}>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name: </label>
                    <input
                        type="text"
                        id="name"
                        value={newActivity.name}
                        onChange={nameChange}
                    />
                </div>
                <div>
                    <label>Description: </label>
                    <input
                        type="text"
                        id="description"
                        value={newActivity.description}
                        onChange={descriptionChange}
                    />
                </div>
                <button type="submit">New Activity</button>
            </form>
            {activities.map((activity) => (
                <div key={activity.id}>
                    <h2>{activity.name}</h2>
                    <p>{activity.description}</p>
                </div>
            ))}
        </div>
    );
};

export default Activities;