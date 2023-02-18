import React, { useEffect, useState } from "react"
import styles from './Profile.module.css'
import { callApi } from "../api/apiCalls"

//map and display all routines/routine_activites this user has created, or display a message if they haven't created anything yet
//add the ability to edit a routine/routine_activity

const Profile = ({ token }) => {
  const [user, setUser] = useState({})
  const [routinesByUser, setRoutinesByUser] = useState([])
  const [displayForm, setDisplayForm] = useState(false)
  const [count, setCount] = useState(0)
  const [duration, setDuration] = useState(0)
  const [updateActs, setUpdateActs] = useState(0)

  //grab the users, id/username
  useEffect(() => {
    callApi({
      url: 'users/me',
      method: "GET",
      token: token
    }).then((data) => {
      console.log('this is the data', data)
      setUser(data)
    }).catch((error) => {
      console.error(error)
    })
  }, [])


  // grab all public/private routines GET /api/users/:username/routines
  useEffect(() => {
    callApi({
      url: `users/${user.username}/routines`,
      method: "GET",
      token: token
    }).then((data) => {
      console.log("this is routines", data)
      setRoutinesByUser(data)
    }).catch((error) => {
      console.error(error)
    })
  }, [user, updateActs])

  function removeActivity(act) {
    callApi({
      url: `routine_activities/${act.routineActivityId}`,
      method: "DELETE",
      token: token
    }).then((data) => {
      if (data) {
        alert("activity successfully removed.")
        setUpdateActs(updateActs+1)
      }
    })
  }

  function updateActivityHandler (count, duration, act) {
    callApi({
      url: `routine_activities/${act.routineActivityId}`,
      method: "PATCH",
      token: token,
      body: {
        count: count,
        duration: duration 
      }
    }).then((data) => {
      if (data) {
        setUpdateActs(updateActs + 1)
        setDisplayForm(false)
        alert("Success! Activity updated.")
      }
    })
  }


  return (
    <>
      <h5 className={styles.heading}>Routines by {user.username}</h5>
      <div className={styles.MainDiv}>
        {routinesByUser.map((routine, index) => (
          <div key={routine.id} className={styles.Cards}>
            <h4>{routine.name}</h4>
            <hr></hr>
            <p className={styles.Goal}> Goal: {routine.goal}</p>
            {
              routine.activities.map((activity, index) => (
                <span key={index} className={styles.list}>
                  <p><span className={styles.boldFont}>Name</span>: {activity.name}</p>
                  <ul>
                    <li>Description: {activity.description}</li>
                    <li>Count: {activity.count} repetitions</li>
                    <li>Duration: {activity.duration} minutes</li>
                  </ul>
                  <button onClick={() => {
                    removeActivity(activity)
                  }}>remove</button>
                  &nbsp;&nbsp;&nbsp;
                  <button onClick={() => {
                    if(!displayForm) { 
                      setDisplayForm(true)
                    } else {
                      setDisplayForm(false)
                    }
                  }}>edit activities</button>
                  { displayForm &&
                    <form className={styles.activityForm} onSubmit={(e) => {
                      e.preventDefault()
                      updateActivityHandler(count, duration, activity)
                      setCount(0)
                      setDuration(0)
                    }}>
                      <label> count:
                        <input type="number" value={count} className={styles.activityInputs} onChange={(e) => {
                          setCount(e.target.value)
                        }}></input>
                      </label>
                      <label> duration:
                        <input type="number" value={duration} className={styles.activityInputs} onChange={(e) => {
                          setDuration(e.target.value)
                        }}></input>
                      </label>
                      <button value="Submit" type="submit" className={styles.addButton}>Update</button>
                    </form>
                  }
                </span>
              ))
            }
            {/* delete the entire routine and ALL associated activities */}
            <div className={styles.buttonContainer}>
              <span></span>
              <span></span>
              <button className={styles.submitButton}>edit routine</button>
              <button className={styles.submitButton}>delete routine</button>
            </div>
          </div>

        )
        )}
      </div>
    </>
  )
}

export default Profile