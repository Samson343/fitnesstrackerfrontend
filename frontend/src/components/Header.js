import React from "react"
import styles from './Header.module.css'

// A simple header with no icons or menus, used only when logging in/registering

export const Header = () => {
    return (
        <header className={styles.header}>
            <header className={styles.NavHeader}>
                <span className={styles.navHeading}>Fitness track.er</span>
            </header>
        </header>
    )
}