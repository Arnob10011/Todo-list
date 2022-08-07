import { fetchAPI } from "./api.js";
import { notification } from "./notify.js";
const loadingDOM = document.querySelector(".preloader");
const taskContainer = document.querySelector(".tasks");
const taskInput = document.querySelector(".form__input");

async function showTasks() {
  try {
    loadingDOM.style.visibility = "visible";

    const response = await fetch("/task-data");

    // fails to fetch data
    if (!response.ok)
      throw new Error("There is something wrong. Please try again.");

    const { tasks } = await response.json();

    if (tasks.length < 1) {
      // hide the loader when  message appears
      return insertErrorMessage("No Tasks Found");
    }

    const tasksHtml = tasks
      .map((task) => insertMessage(task.name, task._id, task.completed))
      .join("");

    taskContainer.innerHTML = tasksHtml;
  } catch (error) {
    // hide the loader when  message appears
    insertErrorMessage(error.message, true);
  }
}

showTasks();

function insertErrorMessage(msg, error = false) {
  loadingDOM.style.visibility = "hidden";

  // error will enable the tryagain html
  if (error) {
    const html = `
    
    <div class="error">
  <div>${msg}</div>
  <a href="/reload" class="btn btn-error">
    <div>Try Again</div>
    <img src="img/tryagain.svg" class="tryagain-logo" />
  </a>
</div>

    `;

    return (taskContainer.innerHTML = html);
  }

  taskContainer.innerHTML = msg;
}

function insertMessage(msg, id, completed) {
  loadingDOM.style.visibility = "hidden";

  let taskCompleted;
  if (completed) taskCompleted = "task__completed";
  else taskCompleted = "";

  return `
  
  <div class="task">
  <div class="task__message ${taskCompleted}">${msg}</div>
  <div class="task__btns">
    <a class="btn-edit" href="/task-update/${id}">
      <i class="fas fa-edit"></i>
    </a>

    <button type="button" data-id="${id}" class="btn-delete">
      <i class="fas fa-trash"></i>
    </button>
  </div>
</div>
  `;
}

const form = document.querySelector(".form__task");
form.addEventListener("submit", getTask);

async function getTask(e) {
  try {
    e.preventDefault();

    // if the given input is empty
    if (taskInput.value === "") return notification("Invalid Input", "invalid");

    // if the input is given
    notification("Success");

    const res = await fetchAPI("/", "post", { name: taskInput.value });

    if (!res.ok) throw new Error("Error. Cannot add task");

    taskInput.value = "";
    await showTasks();
  } catch (error) {
    notification(error.message, "invalid");
  }
}

taskContainer.addEventListener("click", deleteTask);

async function deleteTask(e) {
  try {
    const clicked = e.target;
    if (!clicked.parentElement.classList.contains("btn-delete")) return;

    const taskID = clicked.parentElement.dataset.id;
    const res = await fetchAPI("/", "DELETE", { id: taskID });

    if (!res.ok)
      throw new Error("Sorry can't delete the task . Please try again");

    showTasks();
  } catch (error) {
    insertErrorMessage(error.message, true);
  }
}
