import { fetchAPI } from "./api.js";
import { notification } from "./notify.js";
const inputValue = document.querySelector("#edit__input_task");
const formEdit = document.querySelector(".edit__task_container");
const checkBoxInput = document.querySelector("#edit__checkbox_task");
const taskID = document.querySelector("#id").textContent;

async function showTask() {
  try {
    const res = await fetch(`/task-update/data/${taskID}`);
    if (!res.ok) throw new Error("Cannot update the task");

    const { task } = await res.json();

    const completed = task.completed;

    if (!completed) return (checkBoxInput.checked = false);
    checkBoxInput.checked = true;
  } catch (error) {
    console.error(error.message);
  }
}
showTask();

formEdit.addEventListener("submit", editTask);

async function editTask(e) {
  try {
    e.preventDefault();

    const res = await fetchAPI(`/task-update/${taskID}`, "PATCH", {
      name: inputValue.value,
      id: taskID,
      completed: checkBoxInput.checked,
    });

    if (!res.ok) throw new Error("Error. Cannot edit the task");

    notification("Successfully edited the task", "");
  } catch (error) {
    notification(error.message, "invalid");
  }
}
