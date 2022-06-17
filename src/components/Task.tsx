import { Trash, Circle, Check } from "phosphor-react";

import styles from "./Task.module.css";

interface TaskProps {
  id: string;
  title: string;
  isCompleted: boolean;
  onDeleteTask: (id: string) => void;
  onCompletedTask: (id: string) => void;
}

export function Task({
  id,
  title,
  isCompleted,
  onDeleteTask,
  onCompletedTask,
}: TaskProps) {
  function handleDeleteTask(id: string) {
    onDeleteTask(id);
  }

  function handleCompletedTask(id: string) {
    onCompletedTask(id);
  }

  return (
    <li className={styles.container}>
      <div className={isCompleted ? styles.completedTask : styles.task}>
        <button  className={isCompleted ? styles.buttonCompletedTask : styles.buttonPendingTask } onClick={() => handleCompletedTask(id)}>
          {isCompleted ? <Check /> : <Circle />}
        </button>
        {title}
      </div>
      <button className={styles.deleteTask} onClick={() => handleDeleteTask(id)}>
        <Trash />
      </button>
    </li>
  );
}
