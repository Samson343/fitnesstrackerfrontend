import React from "react"
import styles from './Routines.module.css'
import { useEffect, useState } from "react"
import { callApi } from "../api/apiCalls"

//map and display all public routines from the routines table 
//make a form to create a new routine in the database - will need inputs for name, goal, and isPublic
//finally, add functionality to attach activities to existing routines


const Routines = ({ token }) => {
    const [routines, setRoutines] = useState([])
    const [displayActivities, setDisplayActivities] = useState(false)

    useEffect(() => {
        callApi({ url: 'routines' })
            .then(data => {
                setRoutines(data)
                console.log(data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    return (
        <div className={styles.MainDiv}>

            {routines.map((routine, index) => (
                <div key={index} className={styles.Cards}>
                    <h4>{routine.name}</h4>
                    <hr></hr>
                    <p>Goal: {routine.goal}</p>
                    {
                        routine.activities.length &&
                        <>
                            <span>Activities: &nbsp;</span>
                            <button onClick={() => {
                                if (!displayActivities) {
                                    setDisplayActivities(true)
                                } else if (displayActivities) {
                                    setDisplayActivities(false)
                                }

                            }
                            }>&#9660;</button>
                        </>
                    }
                    {
                        displayActivities &&
                        routine.activities.map((activity, index) => (
                            <span key={index}>
                                <ul>
                                    <li>Name: {activity.name}</li>
                                    <li>Description: {activity.description}</li>
                                    <li>Duration: {activity.duration}</li>
                                    <li>Count: {activity.count}</li>
                                </ul>
                            </span>
                        ))
                    }
                </div>
            ))
            }

        </div>
    )
}

export default Routines