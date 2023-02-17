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

//some material UI junk just to change the color of a button
import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(199, 190, 190)',
    }
  },
});


const Routines = ({ token }) => {
  const [routines, setRoutines] = useState([])
  const [activities, setActivities] = useState([])
  const [displayActivities, setDisplayActivities] = useState(false)
  const [displayCreateForm, setDisplayCreateForm] = useState(false)
  const [name, setName] = useState('')
  const [goal, setGoal] = useState('')

  useEffect(() => {
    callApi({ url: 'routines' })
      .then(data => {
        setRoutines(data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  useEffect(() => {
    callApi({url: "activities"})
      .then(data => {
        console.log("this is activities", data)
        setActivities(data)
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
        <form className={styles.createForm} onSubmit={async (e) => {
          e.preventDefault()
          console.log("hello")
          try {
            await callApi({
              url: 'routines', method: "POST", token: token, body: {
                name: name,
                goal: goal,
                isPublic: true
              }
            }).then((data) => {
              console.log(data)
              setName('')
              setGoal('')

              if (data) {
                alert(`Success! Your routine "${data.name}" is now in the database`)
              }
            })
          } catch (error) {
            console.error(error)
          }
        }}>
          <TextField size="small" value={name} className={styles.formInputs} onChange={(e) => {
            setName(e.target.value)
          }}
            id="outlined-basic" label="Name your routine" variant="outlined" />
          <TextField size="small" value={goal} name="goal" className={styles.formInputs} onChange={(e) => {
            setGoal(e.target.value)
          }}
            id="outlined-basic" label="What's the goal?" variant="outlined" />
          <ThemeProvider theme={theme}>
            <Button className={styles.submitButton} size="small" type="submit" color="primary">Create</Button>
          </ThemeProvider>

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

                {/* some beautiful html to space out the circle icon since it's so hard to style material UI components */}
                <span>&nbsp;&nbsp;</span>
                <AddCircleOutlineIcon className={styles.addButton}></AddCircleOutlineIcon>

                <select className={styles.selector}>
                  {
                    activities.map( (activity) => (
                      <option className = {styles.options} key = {activity.id} value = {activity.id}>Name: {activity.name}</option> 
                      )
                    )
                  }
                </select>

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