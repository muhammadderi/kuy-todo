const kuyTodo = document.querySelector("form");
const kuyInput = document.getElementById("input-form");
const kuyDate = document.getElementById("kuy-date");
const kuyListUL = document.getElementById("todo-list");
const kuyHeader = document.querySelector(".todo-header");
const doneListUL = document.querySelector(".done-list");

const allTodos = [];
const allDone = [];

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
    <label for="${kuyId}" class="detail-task">
      <h4 id="kuy-content">${todo.text}</h4>
      <span>${todo.date}</span>
    </label>
  `;

  const kuyCheckbox = kuyList.querySelector(`#${kuyId}`);
  const kuyTextCross = kuyList.querySelector("#kuy-content");
 

  kuyCheckbox.addEventListener("change", function() {
    if (this.checked) {
      kuyTextCross.style.textDecoration = "line-through";
    } else {
      kuyTextCross.style.textDecoration = "none";
    }
  });

  // deleteButton.addEventListener("click", function() {
  //   if (kuyCheckbox.checked) {
  //     allTodos.splice(todoIndex, 1);
  //     updateKuyList();
  //     allTodos.length === 0 ? kuyHeader.innerText = "" : "";
  //   } 
  // })

  return kuyList;
}


{/* <button class="delete">
<img src="./assets/images/delete-img.png" alt="delete" />
</button> 
 const deleteButton = kuyList.querySelector(".delete");
*/}