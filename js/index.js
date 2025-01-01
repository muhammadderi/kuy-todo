const kuyTodo = document.querySelector("form");
const kuyInput = document.getElementById("input-form");
const kuyDate = document.getElementById("kuy-date");
const kuyListUL = document.getElementById("todo-list");
const kuyHeader = document.querySelector(".todo-header");

const allTodos = [];

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
    updateKuyList();
    kuyInput.value = "";
    kuyDate.value = "";
  } else {
    alert("Harap isi tugas dan tanggal!");
  }
}

function updateKuyList() {
  kuyListUL.innerHTML = "";
  allTodos.forEach((todo, todoIndex) => {
    const kuyItem = createTodoItem(todo, todoIndex);
    kuyListUL.append(kuyItem);
  });
}

function createTodoItem(todo, todoIndex) {
  const kuyId = "todo-" + todoIndex;
  const kuyList = document.createElement("li");
  kuyList.className = "todo";
  kuyList.innerHTML = `
    <input type="checkbox" id="${kuyId}" />
    <label for="${kuyId}">
      <span>${todo.text}</span>
      <span>(${todo.date})</span>
    </label>
    <button class="delete">
      <img src="./assets/images/delete-img.png" alt="delete" />
    </button>
  `;
  return kuyList;
}

console.log("Daftar semua tugas:", allTodos);
console.log("Tugas yang dirender:", todo);
