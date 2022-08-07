export function notification(msg, type = "") {
  const notify = document.querySelector(".notify__style");
  notify.classList.add("notify__style-active");

  if (type === "invalid") {
    notify.classList.remove("notify__success");
    notify.classList.add("notify__fail");
  } else {
    notify.classList.remove("notify__fail");
    notify.classList.add("notify__success");
  }

  notify.textContent = msg;

  setTimeout(() => notify.classList.remove("notify__style-active"), 5000);
}
