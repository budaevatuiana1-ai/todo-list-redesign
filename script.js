// Логику менять не нужно — задача челленджа только в вёрстке/стилях (index.html, style.css).

const STORAGE_KEY = "todo-list-tasks";

function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function render() {
  const tasks = loadTasks();
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.done) li.className = "done";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", () => {
      const current = loadTasks();
      current[index].done = checkbox.checked;
      saveTasks(current);
      render();
    });

    const text = document.createElement("span");
    text.className = "task-text";
    text.textContent = " " + task.text;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "удалить";
    removeBtn.addEventListener("click", () => {
      const current = loadTasks();
      current.splice(index, 1);
      saveTasks(current);
      render();
    });

    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(removeBtn);
    list.appendChild(li);
  });

  document.getElementById("taskCount").textContent = tasks.length;
  document.getElementById("doneCount").textContent = tasks.filter((t) => t.done).length;
}

document.getElementById("addBtn").addEventListener("click", () => {
  const input = document.getElementById("taskInput");
  const value = input.value.trim();
  if (!value) return;

  const tasks = loadTasks();
  tasks.push({ text: value, done: false });
  saveTasks(tasks);
  input.value = "";
  render();
});

document.getElementById("taskInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") document.getElementById("addBtn").click();
});

render();
