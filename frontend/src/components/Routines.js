import React from "react"
import styles from './Routines.module.css'
import { useEffect, useState } from "react"
import { callApi } from "../api/apiCalls"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TextField from '@mui/material/TextField';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Button from '@mui/material/Button';

//map and display all public routines from the routines table 
//make a form to create a new routine in the database - will need inputs for name, goal, and isPublic
//finally, add functionality to attach activities to existing routines


const Routines = ({ token }) => {
  const [routines, setRoutines] = useState([])
  const [displayActivities, setDisplayActivities] = useState(false)
  const [displayCreateForm, setDisplayCreateForm] = useState(false)
  const [name, setName] = useState('')
  const [goal, setGoal] = useState('')

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
    <div className={styles.routines}>
      <h3 className={styles.heading}>Routines
        <AddBoxIcon onClick={() => {
            if (!displayCreateForm) {
              setDisplayCreateForm(true)
            } else if (displayCreateForm) {
              setDisplayCreateForm(false)
            }
          }
        }
        ></AddBoxIcon>
      </h3>
      {token && displayCreateForm &&
        <form className={styles.createForm} onSubmit = {async (e) => {
           e.preventDefault()
           console.log("hello")
           try {
            await callApi ({url: 'routines', method: "POST", token: token, body: {
              name: name,
              goal: goal,
              isPublic: true
            } }).then((data) => {
              console.log(data)
              setName('')
              setGoal('')
            })
           } catch (error) {
            console.error(error)
           }
        }}>
          <TextField size = "small" value = {name} className={styles.formInputs} onChange = {(e) => {
             setName(e.target.value)
          }}
          id="outlined-basic" label="Name your routine" variant="outlined" />
          <TextField size = "small" value = {goal} name = "goal" className={styles.formInputs} onChange = {(e) => {
             setGoal(e.target.value)
          }} 
          id="outlined-basic" label="What's the goal?" variant="outlined" />
          <Button className={styles.submitButton} size ="small" type="submit" >Create</Button>
        </form>
      }
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
                <AddCircleOutlineIcon className={styles.addButton}></AddCircleOutlineIcon>

              </>
            }
            {
              displayActivities &&
              routine.activities.map((activity, index) => (
                <span key={index}>
                  <p><span className={styles.boldFont}>Name</span>: {activity.name}</p>
                  <ul>
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
    </div>
  )
}

export default Routines