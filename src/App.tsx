import { v4 as uuidv4 } from "uuid";

import "./index.css";
import styles from "./App.module.css";
import { PlusCircle } from "phosphor-react";
import { Task } from "./components/Task";
import { ChangeEvent, MouseEventHandler, useState } from "react";

import logo from "./logo.svg";
import withoutTasks from "./assets/withoutTasks.png";

interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
}

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const tasksCompleted = tasks.reduce((acc, task) => {
    if (task.isCompleted === true) {
      acc++;
    }

    return acc;
  }, 0);

  function handleSetTask(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setTask(event.target.value);
  }

  function handleAddNewTask(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    if (task.length === 0) {
      return;
    }

    const newTask: Task = {
      id: uuidv4(),
      title: task,
      isCompleted: false,
    };

    setTasks((oldState) => [...oldState, newTask]);

    setTask("");
  }

  function onDeleteTask(taskId: string) {
    const tasksUpdated = tasks.filter((task) => task.id !== taskId);

    setTasks(tasksUpdated);
  }

  function onCompletedTask(taskId: string) {
    const tasksUpdated = tasks.map((task) =>
      task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
    );

    setTasks(tasksUpdated);
  }

  function handleNewTaskInvalid(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Campo obrigatório");
  }

  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>
          <img src={logo} alt="" />
        </header>
        <div className={styles.content}>
          <form className={styles.inputFields} onSubmit={handleAddNewTask}>
            <input
              type="text"
              placeholder="Adicionar nova tarefa"
              onChange={handleSetTask}
              value={task}
              required
              onInvalid={handleNewTaskInvalid}
            />
            <button type="submit">
              Criar
              <PlusCircle />
            </button>
          </form>

          <div className={styles.tasksInfo}>
            <header>
              <div className={styles.tasksCreated}>
                Tarefas criadas <span>{tasks.length}</span>
              </div>
              <div className={styles.tasksCompleted}>
                Concluídas{" "}
                {tasks.length !== 0 ? (
                  <span>
                    {tasksCompleted} á {tasks.length}
                  </span>
                ) : (
                  <span>0</span>
                )}
              </div>
            </header>
          </div>

          {tasks.length === 0 ? (
            <div className={styles.withoutTasks}>
              <img src={withoutTasks} alt="" />
              <p>Você ainda não tem tarefas cadastradas</p>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          ) : (
            <ul>
              {tasks.map((task) => (
                <Task
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  isCompleted={task.isCompleted}
                  onDeleteTask={onDeleteTask}
                  onCompletedTask={onCompletedTask}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
