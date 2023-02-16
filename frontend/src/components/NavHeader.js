import React from "react"
import styles from './NavHeader.module.css'
import { Link } from 'react-router-dom'

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
        <span className={styles.spaceHolder}></span>
    </header>
  )
}