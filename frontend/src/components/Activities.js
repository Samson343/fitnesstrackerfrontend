import React, { useEffect, useState } from "react";
import { callApi } from "../api/apiCalls";
import styles from './Activities.module.css';

//map and display all activites from the activities table
//include a form to create activities that has two inputs - name, and description

const Activities = () => {
    const [activities, setActivities] = useState([]);
    const [newActivity, setNewActivity] = useState({ name: '', description: '' });

    const allActivities = async () => {
        try {
            const response = await callApi({
                url: "/activities"
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

    return (
        <div className={styles.MainDiv}>
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