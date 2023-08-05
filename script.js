let toDoList = document.querySelector(".toDoList");
let action = document.querySelector(".action");
let downIcon = document.querySelector(".downIcon");
let upIcon = document.querySelector(".upIcon");
downIcon.addEventListener("click", sortArray);
upIcon.addEventListener("click", sortArrayReverse);

function newInput() {
  let divLi = document.createElement("div");
  divLi.classList.add("divLi");
  toDoList.append(divLi);
  let input = document.createElement("input");
  input.type = "text";
  input.classList.add("input");
  input.placeholder = "Write text!";
  divLi.append(input);
  let divLiClear = document.createElement("div");
  divLiClear.classList.add("divLiClear");
  divLi.append(divLiClear);
  let deleteImg = document.createElement("img");
  deleteImg.src = "img/delete.svg";
  divLiClear.append(deleteImg);

  divLiClear.addEventListener("click", () => {
    if (input.value !== "") {
      input.value = ""; // Kaydedilmişse delete butonuna bastığında inputu boşaltır.
    } else {
      divLi.remove(); // Kaydedilmemişse delete butonuna bastığında görevi siler.
    }
  });

  input.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
      if (input.value !== "") {
        let newDivLi = document.createElement("div");
        newDivLi.classList.add("newDivLi");
        toDoList.append(newDivLi);
        let new_Input = document.createElement("input");
        new_Input.classList.add("new_Input");
        new_Input.type = "text";
        new_Input.name = "name";
        new_Input.placeholder = "Write text!";
        new_Input.setAttribute("value", input.value);
        new_Input.value = input.value;
        new_Input.readOnly = true;
        newDivLi.append(new_Input);
        let divLiRemove = document.createElement("div");
        divLiRemove.classList.add("divLiRemove");
        newDivLi.append(divLiRemove);
        divLiRemove.append(deleteImg);
        divLi.remove();

        divLiRemove.addEventListener("click", () => {
          newDivLi.remove();
          const conclusive = document.querySelector(".divLi");
          const count = document.querySelectorAll(".newDivLi");
          let a = 0;
          count.forEach(() => {
            a++;
          });
          if (a == 0) {
            if (conclusive == null) {
              newInput();
            }
          }
        });

        toDoList.scrollTop = toDoList.scrollHeight;
      }
    }
  });

  toDoList.scrollTop = toDoList.scrollHeight;
}

newInput();
action.addEventListener("click", newInput);

function sortArray() {
  let items = document.querySelectorAll(".newDivLi");
  let sortedItems = Array.from(items).sort((a, b) => {
    return a.firstChild.value.localeCompare(b.firstChild.value);
  });
  for (let i = 0; i < sortedItems.length; i++) {
    toDoList.appendChild(sortedItems[i]);
  }
  downIcon.style.display = "none";
  upIcon.style.display = "flex";
}

function sortArrayReverse() {
  let items = document.querySelectorAll(".newDivLi");
  let sortedItems = Array.from(items).sort((a, b) => {
    return b.firstChild.value.localeCompare(a.firstChild.value);
  });
  for (let i = 0; i < sortedItems.length; i++) {
    toDoList.appendChild(sortedItems[i]);
  }
  downIcon.style.display = "flex";
  upIcon.style.display = "none";
}
new Sortable(toDoList, {
      animation: 350,
    });