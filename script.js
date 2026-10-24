const infoCard = document.querySelector(".info-card");
const unorderedList = document.querySelector("ul");
const functionButtons = document.querySelector(".function-buttons");
const inputElement = document.querySelector(".task-input");
const submitBtn = document.querySelector(".submit-btn");
const form = document.querySelector("form");
const removeBtn = document.querySelector(".remove-btn");
const activeBtn = document.querySelector(".active-btn");
const allBtn = document.querySelector(".all-btn");
const completedBtn = document.querySelector(".completed-btn");

const toDoItems = [];
const completedTasks = [];

inputElement.addEventListener("input", function () {
  submitBtn.disabled = inputElement.value.trim() === "";
  if (inputElement.value === "") {
    submitBtn.classList.add(
      "disabled:bg-gray-100",
      "disabled:text-gray-600",
      "disabled:cursor-not-allowed",
      "cursor-not-allowed",
    );
  } else {
    submitBtn.classList.remove(
      "disabled:bg-gray-100",
      "disabled:text-gray-600",
      "disabled:cursor-not-allowed",
    );
    submitBtn.classList.add("bg-blue-400", "text-white", "cursor-pointer");
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  /********************************************* Add new Task *************************************************** */
  const inputElementValue = inputElement.value.trim();
  if (!inputElementValue) return;
  inputElement.value = "";
  submitBtn.disabled = true;
  submitBtn.classList.add(
    "disabled:bg-gray-100",
    "disabled:text-gray-600",
    "disabled:cursor-not-allowed",
    "cursor-not-allowed",
  );
  toDoItems.push(inputElementValue);
  console.log(toDoItems);

  const listElement = document.createElement("li");
  listElement.classList.add(
    "flex",
    "shadow-sm",
    "px-[1em]",
    "justify-center",
    "items-center",
    "bg-gray-50",
    "h-[3em]",
    "mb-[1em]",
    "not-completed",
  );

  const newParagraph = document.createElement("p");
  newParagraph.classList.add("flex-6");
  newParagraph.textContent = inputElementValue;

  const newDiv = document.createElement("div");
  newDiv.classList.add("flex-1", "justify-between", "flex", "items-center");

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  const checkBoxContainer = document.createElement("div");
  checkBoxContainer.appendChild(checkBox);

  const removeItem = document.createElement("div");
  removeItem.classList.add("text-red-400");
  removeItem.textContent = "X";
  removeItem.classList.add("cursor-pointer");
  newDiv.append(checkBoxContainer, removeItem);

  listElement.append(newParagraph, newDiv);
  unorderedList.classList.remove("hidden");
  unorderedList.style.listStyleType = "none";
  unorderedList.appendChild(listElement);
  infoCard.classList.add("hidden");
  functionButtons.classList.remove("hidden");
  functionButtons.classList.add("grid");

  /********************************************* Mark task completed *************************************************** */
  checkBox.addEventListener("change", function (e) {
    listElement.classList.toggle("not-completed");
    listElement.classList.toggle("completed");
    console.log(listElement);
    if (checkBox.checked) {
      newParagraph.classList.add("line-through");
      completedTasks.push(listElement);
      completedBtn.disabled = false;
      completedBtn.classList.add(
        "bg-green-200",
        "text-white",
        "cursor-pointer",
      );
    } else {
      newParagraph.classList.remove("line-through");
      const index = completedTasks.indexOf(listElement);
      completedTasks.splice(index, 1);
      completedBtn.classList.remove(
        "bg-green-200",
        "text-white",
        "cursor-pointer",
      );
      completedBtn.disabled = true;
    }
    // console.log(completedTasks);
  });

  /********************************************* Remove completed task *************************************************** */
  removeItem.addEventListener("click", function () {
    listElement.remove();
    const index = toDoItems.indexOf(inputElementValue);
    toDoItems.splice(index, 1);
    console.log(toDoItems);

    /********************************************* Active button style *************************************************** */
    if (toDoItems.length === 0) {
      activeBtn.disabled = true;
      activeBtn.classList.remove("bg-yellow-400", "text-white");
      completedBtn.disabled = true;
      completedBtn.classList.remove("bg-green-400", "text-white");
      infoCard.classList.remove("hidden");
      functionButtons.classList.add("hidden");
      listElement.remove();
      return;
    }

    if (completedTasks.length === 0) {
      completedBtn.disabled = true;
      completedBtn.classList.remove("bg-green-400", "text-white");
    }
  });

  if (toDoItems.length !== 0) {
    activeBtn.disabled = false;
    activeBtn.classList.add("bg-yellow-200", "text-white", "cursor-pointer");
  }

  /********************************************* Show active tasks *************************************************** */
  activeBtn.addEventListener("click", function () {
    activeBtn.classList.add("bg-yellow-400");
    allBtn.classList.remove("bg-blue-400");
    completedBtn.classList.add("bg-green-200");
    allBtn.classList.add("bg-blue-200");
    completedBtn.classList.remove("bg-green-400");

    const completedTask = document.querySelectorAll("li.completed");
    const notCompletedTask = document.querySelectorAll("li.not-completed");
    console.log(completedTask);
    completedTask.forEach((element) => {
      element.classList.add("hidden");
    });
    notCompletedTask.forEach((element) => {
      element.classList.remove("hidden");
    });
  });

  /********************************************* Show all button style *************************************************** */
  allBtn.addEventListener("click", function () {
    if (toDoItems.length === 0 || completedTasks.length === 0) {
      allBtn.disabled = true;
    }
    allBtn.classList.add("bg-blue-400");
    activeBtn.classList.remove("bg-yellow-400");
    listElement.classList.remove("hidden");
    completedBtn.classList.remove("bg-green-400");
    completedBtn.classList.add("bg-green-200");
  });

  /********************************************* Completed button style *************************************************** */
  if (completedTasks.length !== 0) {
    completedBtn.disabled = false;
    completedBtn.classList.add("bg-green-200", "text-white", "cursor-pointer");
  }

  /********************************************* Show completed tasks *************************************************** */
  completedBtn.addEventListener("click", function () {
    completedBtn.classList.remove("bg-green-200");
    completedBtn.classList.add("bg-green-400");
    activeBtn.classList.remove("bg-yellow-400");
    allBtn.classList.remove("bg-blue-400");
    allBtn.classList.add("bg-blue-200");
    const notCompletedTask = document.querySelectorAll("li.not-completed");
    const completedTask = document.querySelectorAll("li.completed");
    notCompletedTask.forEach((element) => {
      element.classList.add("hidden");
    });
    completedTask.forEach((element) => {
      element.classList.remove("hidden");
    });
  });

  /********************************************* Remove all tasks *************************************************** */
  removeBtn.addEventListener("click", function () {
    completedTasks.length = 0;
    toDoItems.length = 0;
    listElement.remove();
    functionButtons.classList.add("hidden");
    infoCard.classList.remove("hidden");
    return;
  });
});
