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
const numberCompleted = document.querySelector(".number-completed");
const taskAvailable = document.querySelector(".number-available");

const toDoItems = [];
const completedTasks = [];
console.log(completedTasks.length);

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
    submitBtn.classList.add(
      "cursor-pointer",
      "bg-linear-to-r",
      "from-[#8d9096]",
      "via-[#f2f3f5]",
      "to-[#b3b6bc]",
      "text-black",
    );
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
  taskAvailable.innerText = toDoItems.length;
  console.log(toDoItems);

  const listElement = document.createElement("li");
  listElement.classList.add(
    "flex",
    "gap-3",
    "shadow-sm",
    "px-[1em]",
    "justify-center",
    "items-center",
    "border-b-1",
    "border-b-gray-700",
    "text-white",
    "h-[3em]",
    "not-completed",
  );

  const newParagraph = document.createElement("p");
  newParagraph.classList.add("flex-6");
  newParagraph.textContent = inputElementValue;

  const newDiv = document.createElement("div");
  newDiv.classList.add("flex-1", "flex", "items-center", "justify-end");

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.classList.add(
    "peer",
    "size-5",
    "appearance-none",
    "rounded-full",
    "border",
    "border-[#c9ccd1]",
    "bg-black",
    "checked:bg-black",
    "cursor-pointer",
  );
  const checkBoxContainer = document.createElement("div");
  checkBoxContainer.classList.add(
    "relative",
    "inline-flex",
    "size-5",
    "items-center",
    "justify-center",
  );
  const checkMark = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  checkMark.setAttribute("viewBox", "0 0 16 16");
  checkMark.setAttribute("aria-hidden", "true");
  checkMark.classList.add(
    "pointer-events-none",
    "absolute",
    "inset-0",
    "m-auto",
    "hidden",
    "size-3",
    "text-[#c9ccd1]",
    "peer-checked:block",
  );
  const checkMarkPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  checkMarkPath.setAttribute("d", "m3 8 3 3 7-7");
  checkMarkPath.setAttribute("fill", "none");
  checkMarkPath.setAttribute("stroke", "currentColor");
  checkMarkPath.setAttribute("stroke-width", "2");
  checkMarkPath.setAttribute("stroke-linecap", "round");
  checkMarkPath.setAttribute("stroke-linejoin", "round");
  checkMark.appendChild(checkMarkPath);
  checkBoxContainer.appendChild(checkBox);
  checkBoxContainer.appendChild(checkMark);

  const removeItem = document.createElement("div");
  removeItem.classList.add("text-red-400");
  removeItem.textContent = "X";
  removeItem.classList.add("cursor-pointer");
  newDiv.append(removeItem);

  listElement.append(checkBoxContainer, newParagraph, newDiv);
  unorderedList.classList.remove("hidden");
  unorderedList.style.listStyleType = "none";
  unorderedList.appendChild(listElement);
  infoCard.classList.add("hidden");

  /********************************************* Mark task completed *************************************************** */
  checkBox.addEventListener("change", function (e) {
    listElement.classList.toggle("not-completed");
    listElement.classList.toggle("completed");
    console.log(listElement);
    if (checkBox.checked) {
      newParagraph.classList.add("line-through");
      completedTasks.push(listElement);
      console.log(completedTasks.length);
      numberCompleted.textContent = completedTasks.length;
      completedBtn.disabled = false;
      completedBtn.classList.add("cursor-pointer");
    } else {
      newParagraph.classList.remove("line-through");
      const index = completedTasks.indexOf(listElement);
      completedTasks.splice(index, 1);
      completedBtn.classList.remove("cursor-pointer");
      numberCompleted.innerHTML = completedTasks.length;
      completedBtn.disabled = true;
    }
    // console.log(completedTasks);
  });

  /********************************************* Remove completed task *************************************************** */
  removeItem.addEventListener("click", function () {
    if (listElement.classList.contains("completed")) {
      const index = completedTasks.indexOf(inputElementValue);
      completedTasks.splice(index, 1);
      console.log(completedTasks);
    }
    listElement.remove();
    const index = toDoItems.indexOf(inputElementValue);
    toDoItems.splice(index, 1);
    numberCompleted.innerText = completedTasks.length;
    taskAvailable.innerText = toDoItems.length;
    console.log(toDoItems);

    /********************************************* Active button style *************************************************** */
    if (toDoItems.length === 0) {
      activeBtn.disabled = true;
      completedBtn.disabled = true;
      completedBtn.classList.remove("text-white");
      infoCard.classList.remove("hidden");
      infoCard.classList.add("flex");
      listElement.remove();
      return;
    }

    if (completedTasks.length === 0) {
      completedBtn.disabled = true;
      completedBtn.classList.remove("text-white");
    }
  });

  if (toDoItems.length !== 0) {
    activeBtn.disabled = false;
  }

  /********************************************* Show active tasks *************************************************** */
  activeBtn.addEventListener("click", function () {
    activeBtn.classList.add("bg-white", "text-black");
    allBtn.classList.remove("bg-white", "text-black");
    completedBtn.classList.remove("bg-white", "text-black");

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
    if (toDoItems.length === 0) {
      allBtn.disabled = true;
    }
    allBtn.classList.add("bg-white", "text-black");
    activeBtn.classList.remove("bg-white", "text-black");
    removeBtn.classList.remove("bg-white", "text-black");
    completedBtn.classList.remove("bg-white", "text-black");
    listElement.classList.remove("hidden");
  });

  /********************************************* Completed button style *************************************************** */
  if (completedTasks.length !== 0) {
    completedBtn.disabled = false;
    completedBtn.classList.add("text-white", "cursor-pointer");
  }

  /********************************************* Show completed tasks *************************************************** */
  completedBtn.addEventListener("click", function () {
    completedBtn.classList.add("bg-white", "text-black");
    activeBtn.classList.remove("bg-white", "text-black");
    allBtn.classList.remove("bg-white", "text-black");
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
    infoCard.classList.remove("hidden");
    infoCard.classList.add("flex");
    numberCompleted.innerText = completedTasks.length;
    taskAvailable.innerText = toDoItems.length;
    return;
  });
});
