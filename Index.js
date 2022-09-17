const newBook = document.querySelector(".new_book");
const myForm = document.querySelector("form");
const submit = document.querySelector(".submit_button");
const bookTitle = document.querySelector("#book_title");
const bookAuthor = document.querySelector("#book_author");
const bookPages = document.querySelector("#number_of_pages");
const radioButtons = document.querySelectorAll("[type=radio]");
const libUI = document.querySelector(".library");
const allInputs = document.querySelectorAll("input");

let myLibrary = [];
let currentBookIndex = -1;

newBook.addEventListener("click", () => {
  myForm.classList.remove("hide");
});

submit.addEventListener("click", (e) => {
  if (ValidateAllInputs()) {
    e.preventDefault();
    addToLibArray();
    createLibDiv();
  } else {
    e.preventDefault();
    /* TODO- Add an element to the page that will display a warning to the user instead of
an alert. */
    /* TODO- Add specific warnings depending on what went wrong. (Can't remember how to do 
that exaclty. Will have to revisit the validity checking section on MDN and TOP) */
    // alert("Invalid");
  }
});

function ValidateAllInputs() {
  let Verification = true;
  allInputs.forEach((input) => {
    if (!input.reportValidity()) {
      Verification = false;
      console.log(`${input.name} is a falsy input`);
    }
  });
  return Verification;
}

function addToLibArray() {
  currentBookIndex += 1;
  myLibrary.push(
    new Book(bookTitle.value, bookAuthor.value, bookPages.value, checkRadio())
  );
}

function createLibDiv() {
  let libItem = document.createElement("div");
  libItem.classList.add("book_div");
  libItem.setAttribute("data_libIndex", currentBookIndex);
  libUI.appendChild(libItem);
  createDeleteButton(libItem);
  createInfoDivs(libItem);
}

function checkRadio() {
  let bb;
  radioButtons.forEach((button) => {
    if (button.checked === true) {
      bb = button.value;
    }
  });
  return bb;
}

function createDeleteButton(libItem) {
  let delButton = document.createElement("button");
  delButton.textContent = "X";
  delButton.classList.add("delete_button");
  delButton.Obj = myLibrary[currentBookIndex];
  libItem.appendChild(delButton);
  delButton.addEventListener("click", function () {
    myLibrary.splice(delButton.Obj.counter(), 1);
    libItem.remove();
    currentBookIndex -= 1;
  });
}

function createInfoDivs(libItem) {
  for (let i = 1; i <= 4; i++) {
    let libItem_Info = document.createElement("div");
    libItem_Info.classList = `div${i}`;
    switch (i) {
      case 1:
        libItem_Info.textContent = `Title: ${myLibrary[currentBookIndex].title}`;
        break;
      case 2:
        libItem_Info.textContent = `Author: ${myLibrary[currentBookIndex].author}`;
        break;
      case 3:
        libItem_Info.textContent = `Number of Pages: ${myLibrary[currentBookIndex].pages}`;
        break;
      case 4:
        libItem_Info.Obj = myLibrary[currentBookIndex];
        libItem_Info.addEventListener("click", changeHaveRead);
        libItem_Info.textContent = myLibrary[currentBookIndex].haveread;
        if (myLibrary[currentBookIndex].opt) {
          libItem_Info.style.backgroundColor = "var(--LIGHT-BLUE)";
        } else {
          libItem_Info.style.backgroundColor = "var(--DARK-RED)";
        }
        break;
    }
    libItem.appendChild(libItem_Info);
  }
}

function changeHaveRead() {
  this.Obj.changeStatus();
  if (this.Obj.opt) {
    this.style.backgroundColor = "var(--LIGHT-BLUE)";
  } else {
    this.style.backgroundColor = "var(--DARK-RED)";
  }
  this.textContent = myLibrary[currentBookIndex].haveread;
}

function Book(title, author, pages, haveread) {
  (this.title = title), (this.author = author), (this.pages = pages);
  if (haveread === "yes") {
    this.haveread = "Already read";
    this.opt = true;
  } else {
    this.haveread = "Haven't read yet";
    this.opt = false;
  }
}

Book.prototype.changeStatus = function () {
  if (this.haveread) {
    if (this.opt) {
      this.haveread = "Haven't read yet";
      this.opt = false;
    } else if (!this.opt) {
      this.haveread = "Already read";
      this.opt = true;
    }
  }
};

Book.prototype.counter = function () {
  return myLibrary.indexOf(this);
};
