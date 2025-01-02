const kuyTodo = document.querySelector("form");
const kuyInput = document.getElementById("input-form");
const kuyDate = document.getElementById("kuy-date");
const kuyListUL = document.getElementById("todo-list");
const kuyHeader = document.querySelector(".todo-header");
const kuyHeaderDone = document.querySelector(".todo-header-done");
const doneListUL = document.getElementById("done-list");

const allTodos = [];
const doneTodos = [];

// Event listener untuk tombol tambah tugas
kuyTodo.addEventListener("submit", function (e) {
  e.preventDefault();
  addTodo();
});

function addTodo() {
  const kuyText = kuyInput.value.trim();
  const kuyDateTodo = kuyDate.value.trim();
  if (kuyText.length > 0 && kuyDateTodo.length > 0) {
    allTodos.push({ text: kuyText, date: kuyDateTodo });
    kuyHeader.innerText = "Daftar Tugas";
    kuyHeaderDone.innerText = doneTodos.length > 0 ? "Tugas Selesai" : "";
    updateKuyList();
    kuyInput.value = "";
    kuyDate.value = "";
  } else {
    alert("Harap isi tugas dan tanggal!");
  }
}

function updateKuyList() {
  kuyListUL.innerHTML = "";
  doneListUL.innerHTML = "";

  // Render daftar tugas
  allTodos.forEach((todo, todoIndex) => {
    const kuyItem = createTodoItem(todo, todoIndex);
    kuyListUL.append(kuyItem);
  });

  // Render daftar tugas selesai
  doneTodos.forEach((todo) => {
    const kuyItem = createDoneItem(todo);
    doneListUL.append(kuyItem);
  });

  // Perbarui header
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
      <h4 id="kuy-content">${todo.text}</h4>
      <span>${todo.date}</span>
    </label>
  `;

  const kuyCheckbox = kuyList.querySelector(`#${kuyId}`);
  kuyCheckbox.addEventListener("change", function () {
    if (this.checked) {
      moveToDone(todo, todoIndex);
    }
  });

  return kuyList;
}

function createDoneItem(todo) {
  const kuyList = document.createElement("li");
  kuyList.className = "done";
  kuyList.innerHTML = `
    <span>${todo.text}</span> - <span>${todo.date}</span>
    <button class="delete-button">Hapus</button>
  `;

  const deleteButton = kuyList.querySelector(".delete-button");
  deleteButton.addEventListener("click", function () {
    doneTodos.splice(doneTodos.indexOf(todo), 1);
    updateKuyList();
  });

  return kuyList;
}

function moveToDone(todo, todoIndex) {
  doneTodos.push(todo);
  allTodos.splice(todoIndex, 1);
  updateKuyList();
}
