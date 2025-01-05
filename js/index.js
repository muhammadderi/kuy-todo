const kuyTodo = document.querySelector("form");
const kuyInput = document.getElementById("input-form");
const kuyLevel = document.getElementById("todo-level");
const kuyListTableHead = document.getElementById("todo-list-header");
const kuyListTableBody = document.getElementById("todo-list");
const kuyHeader = document.querySelector(".todo-header");
const kuyHeaderDone = document.querySelector(".todo-header-done");
const doneListTableBody = document.getElementById("done-list");
const deleteTodoList = document.querySelector(".delete-list");
const deleteDoneList = document.querySelector(".delete-done-list");
const kuyListTableDone = document.getElementById("todo-done-list");

let allTodos = [];
let doneTodos = [];

kuyTodo.addEventListener("submit", function (e) {
  e.preventDefault();
  addTodo();
});

function addTodo() {
  const kuyText = kuyInput.value.trim();
  const kuyLevelTodo = kuyLevel.value;

  if (kuyText.length > 0 && kuyLevelTodo.length > 0) {
    allTodos.push({ text: kuyText, level: kuyLevelTodo });
    kuyInput.value = "";
    kuyLevel.value = "Low";
    updateKuyList();
  } else {
    alert("Harap isi tugas dan pilih level!");
  }
}

function updateKuyList() {
  kuyListTableBody.innerHTML = "";
  doneListTableBody.innerHTML = "";

  allTodos.forEach((todo, index) => {
    const kuyRow = createTodoRow(todo, index);
    kuyListTableBody.appendChild(kuyRow);
  });

  doneTodos.forEach((todo, index) => {
    const doneRow = createDoneRow(todo, index);
    doneListTableBody.appendChild(doneRow);
  });

  kuyHeader.innerText = allTodos.length > 0 ? "Daftar Tugas" : "";
  kuyHeaderDone.innerText = doneTodos.length > 0 ? "Tugas Selesai" : "";
  if (allTodos.length > 0) {
    kuyListTableHead.innerHTML = `
      <tr>
        <th>Aksi</th>
        <th>Tanggal</th>
        <th>Tugas</th>
        <th>Level</th>
      </tr>
    `;
  } else {
    kuyListTableHead.innerHTML = ""; // Hapus header jika tidak ada tugas
  }

  if (doneTodos.length > 0) {
    kuyListTableDone.innerHTML = `
     <tr>
        <th>Tugas</th>
        <th>Level</th>
        <th>Aksi</th>
        </tr>
    `;
  } else {
    kuyListTableDone.innerHTML = ""; // Hapus header jika tidak ada tugas
  }
  handleDeleteButton();
  handleDeleteDoneButton();
}

function createTodoRow(todo, index) {
  const row = document.createElement("tr");

  row.innerHTML = `
    <td><input type="checkbox" data-index="${index}" /></td>
    <td class="todo-line">${new Date().toLocaleString()}</td>
    <td class="todo-line">${todo.text}</td>
    <td class="${todo.level.toLowerCase()}">${todo.level}</td>
  `;

  // const checkbox = row.querySelector("input[type='checkbox']");

  const checkbox = row.querySelector("input[type='checkbox']");
  const todoSubject = row.querySelector(".todo-line");
  checkbox.addEventListener("change", () => moveToDone(index));

  checkbox.addEventListener("change", function () {
    if (this.checked) {
      todoSubject.style.textDecoration = "line-through";
      todoSubject.style.color = "gray";
    } else {
      todoSubject.style.textDecoration = "none";
      todoSubject.style.color = "inherit";
    }
  });

  return row;
}

function createDoneRow(todo, index) {
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${todo.text}</td>
    <td class="${todo.level.toLowerCase()}">${todo.level}</td>
    <td><button class="delete-button"><img src="./assets/images/delete-img.png" alt="delete-img"></button></td>
  `;

  const deleteButton = row.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => {
    if (confirm("Apa kamu yakin mau menghapus?")) {
      doneTodos.splice(index, 1);
      updateKuyList();
    }
  });

  return row;
}

function moveToDone(index) {
  setTimeout(() => {
    doneTodos.push(allTodos[index]);
    allTodos.splice(index, 1);
    updateKuyList();
  }, 1000);
}

function handleDeleteButton() {
  deleteTodoList.innerHTML = "";

  if (allTodos.length > 0) {
    const button = document.createElement("button");
    button.className = "todolist-delete";
    button.innerText = "Hapus Semua Di List";
    button.addEventListener("click", () => {
      if (confirm("Apa kamu yakin mau menghapus semua tugas?")) {
        allTodos = [];
        updateKuyList();
      }
    });
    deleteTodoList.appendChild(button);
  }
}

function handleDeleteDoneButton() {
  deleteDoneList.innerHTML = "";

  if (doneTodos.length > 0) {
    const doneButtonDelete = document.createElement("button");
    doneButtonDelete.className = "todolist-delete";
    doneButtonDelete.innerText = "Hapus Semua List Done";
    doneButtonDelete.addEventListener("click", () => {
      if (confirm("Apa kamu yakin mau menghapus semua tugas selesai?")) {
        doneTodos = [];
        updateKuyList();
      }
    });
    deleteDoneList.appendChild(doneButtonDelete);
  }
}

// Initial call to update the UI
updateKuyList();
