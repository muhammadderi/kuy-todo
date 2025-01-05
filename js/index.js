const kuyTodo = document.querySelector("form");
const kuyInput = document.getElementById("input-form");
const kuyLevel = document.getElementById("todo-level");
const kuyListUL = document.getElementById("todo-list");
const kuyHeader = document.querySelector(".todo-header");
const kuyHeaderDone = document.querySelector(".todo-header-done");
const doneListUL = document.getElementById("done-list");
const currentDate = new Date();
const isoString = currentDate.toISOString();
const date = isoString.split("T")[0];
const time = isoString.split("T")[1].split(".")[0];
const formattedDateTime = `${date} ${time}`;
const deleteTodoList = document.querySelector(".delete-list");
// const deleteTodoList = document.querySelector(".todolist-delete");

let allTodos = [];
let doneTodos = [];

kuyTodo.addEventListener("submit", function (e) {
  e.preventDefault();
  addTodo();
});

function addTodo() {
  const kuyText = kuyInput.value;
  const kuyLevelTodo = kuyLevel.value;
  if (kuyText.length > 0 && kuyLevelTodo.length > 0) {
    allTodos.push({ text: kuyText, level: kuyLevelTodo });
    kuyHeader.innerText = "Daftar Tugas";
    kuyHeaderDone.innerText = doneTodos.length > 0 ? "Tugas Selesai" : "";
    updateKuyList();
    kuyInput.value = "";
    kuyLevelTodo.value = "";
  } else {
    alert("Harap isi tugas dan tanggal!");
  }
}

function updateKuyList() {
  kuyListUL.innerHTML = "";
  doneListUL.innerHTML = "";

  allTodos.forEach((todo, todoIndex) => {
    const kuyItem = createTodoItem(todo, todoIndex);
    kuyListUL.append(kuyItem);
  });

  doneTodos.forEach((todo) => {
    const kuyItem = createDoneItem(todo);
    doneListUL.append(kuyItem);
  });

  if (allTodos.length > 0) {
    const listButton = document.createElement("button");
    listButton.className = "todolist-delete";
    listButton.innerText = allTodos.length > 0 ? "Hapus Semua Di List" : "";
    deleteTodoList.appendChild(listButton);
  } else {
    const deleteTodoList = document.querySelector(".delete-list");
    const listButton = deleteTodoList?.querySelector(".todolist-delete");
    if (listButton) {
      deleteTodoList.removeChild(listButton);
    }
  }

  kuyHeader.innerText = allTodos.length > 0 ? "Daftar Tugas" : "";
  kuyHeaderDone.innerText = doneTodos.length > 0 ? "Tugas Selesai" : "";
}

function createTodoItem(todo, todoIndex) {
  const kuyId = "todo-" + todoIndex;
  const kuyList = document.createElement("li");
  kuyList.className = "todo";
  kuyList.innerHTML = `
    <input type="checkbox" id="${kuyId}" />
    <label for="${kuyId}" class="detail-task">
    <p class="date-todo">${formattedDateTime}</p>
  
      <span>${todo.text}</span>
      <span class="${
        todo.level === "Low"
          ? "low"
          : todo.level === "Medium"
          ? "medium"
          : "high"
      }"></span>
    </label>
  `;

  const kuyCheckbox = kuyList.querySelector(`#${kuyId}`);
  kuyCheckbox.addEventListener("change", function () {
    if (this.checked) {
      setTimeout(function () {
        moveToDone(todo, todoIndex);
      }, 3000);
    }
    alert("Tugasnya kami selesaikan dalam 3 detik ya :)");
  });

  return kuyList;
}

function createDoneItem(todo) {
  const kuyList = document.createElement("li");
  kuyList.className = "done";
  kuyList.innerHTML = `
    <span>${todo.text}</span><span>${todo.level}</span>
    <button class="delete-button"><img src="./assets/images/delete-img.png" alt="trash"></button>
  `;

  const deleteButton = kuyList.querySelector(".delete-button");
  deleteButton.addEventListener("click", function () {
    const userConfirmed = confirm("Apa kamu yakin mau menghapus?");
    if (userConfirmed) {
      doneTodos.splice(doneTodos.indexOf(todo), 1);
      updateKuyList();
    }
  });

  return kuyList;
}

deleteTodoList.addEventListener("click", function () {
  const userConfirmed = confirm("Apa kamu yakin mau menghapus semua di list?");
  if (userConfirmed) {
    allTodos = [];
    updateKuyList();
  }
});

function moveToDone(todo, todoIndex) {
  doneTodos.push(todo);
  allTodos.splice(todoIndex, 1);
  updateKuyList();
}
