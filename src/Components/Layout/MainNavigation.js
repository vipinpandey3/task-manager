import React from "react";
import styles from "./MainNavigation.module.css";
import { NavLink } from "react-router-dom";

const MainNavigation = () => {

  const logoutHandler = () => {
    console.log('TEst')
  }
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Tasks</div>
      <nav className={styles.nav}>
        <ul>
            <li>
                <NavLink to="/tasks" activeClassName={styles.active}>Tasks</NavLink>
            </li>
            <li>
                <NavLink to="/users" activeClassName={styles.active}>Users</NavLink>
            </li>
            <li>
                <NavLink to="/assigned-task" activeClassName={styles.active}>AssignedTask</NavLink>
            </li> 
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
