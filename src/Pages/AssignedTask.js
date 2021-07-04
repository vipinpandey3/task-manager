import React, { useContext, useEffect, useState } from "react";
import styles from "./AssignedTask.module.css";
import Card from "../Components/common/Card";
import { AssigneContext } from "../context/assign-context";

const AssignedTask = () => {
  const { assignedTask } = useContext(AssigneContext);
  return (
    <Card>
      <div className={styles.task}>
        {assignedTask.length > 0 ? (
          <ul>
            {assignedTask.map((assignedTask) => (
              <li key={assignedTask.id}>
                <div>{assignedTask.title}</div>
                <div>{assignedTask.name}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.center}>No task Found</p>
        )}
      </div>
    </Card>
  );
};

export default AssignedTask;
