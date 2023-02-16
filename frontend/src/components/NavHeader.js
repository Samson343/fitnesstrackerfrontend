import React from "react"
import styles from './NavHeader.module.css'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';

//A header with icons and/or menus to navigate to different components

export const NavHeader = () => {
  return (
    <header className={styles.NavHeader}>
        <span className = {styles.navHeading}>Fitness track.er</span>
        <span className={styles.menuContainers}>
          <Link to="/activities" className={styles.link} title='View available exercises in the database, or add a new one'>
            <h4>Activities</h4>
          </Link>
          <Link className={styles.link} to='/routines' title='Create a new routine or select an existing one'>
            <h4>Routines</h4>
          </Link>
          <Link className={styles.link} to="/profile" title='Profile'>
            <h4>Profile</h4>
          </Link>
        </span>
        {/* <Button variant="outlined" color="error">
          Register/Login
        </Button>  */}
        {/* styling mui components is harder than it's worth lol */}
        <Link to = "/login">
        <button className= {styles.Button}>Register/Login</button>
        </Link>

    </header>
  )
}