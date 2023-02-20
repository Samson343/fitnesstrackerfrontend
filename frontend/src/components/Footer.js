import React from "react";
import { IoLogoLinkedin, IoLogoGithub } from "react-icons/io";
import styles from './Footer.module.css';

const Footer = () => {
    const developers = [
        {
            name: "Caroline Kim",
            linkedin: "https://www.linkedin.com/in/caroline-k-717095195/",
            github: "https://github.com/carowoline"
        },
        {
            name: "Kimber Freestone-Hoven",
            linkedin: "https://www.linkedin.com/in/kimber-freestone-hoven-0b9b421b8/",
            github: "https://github.com/kim-bim-123"
        },
        {
            name: "Sam Banister",
            linkedin: "https://www.linkedin.com/in/sam-banister-606301166/",
            github: "https://github.com/Samson343"
        }
    ];

    return (
        <div className={styles.mainDiv}>
            <footer className={styles.footer}>
                {developers.map((developer, index) => (
                    <div key={index} className={styles.developer}>
                        <h4>{developer.name}</h4>
                        <div className={styles.icons}>
                            <a href={developer.linkedin} target="_blank" rel="noreferrer">
                                <IoLogoLinkedin size={18} color="white" />
                            </a>
                            <a href={developer.github} target="_blank" rel="noreferrer">
                                <IoLogoGithub size={18} color="white" />
                            </a>
                        </div>
                    </div>
                ))}
            </footer>
        </div>
    );
};

export default Footer;
