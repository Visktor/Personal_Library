const newBook = document.querySelector(".new_book");
const myForm = document.querySelector("form");
const submit = document.querySelector(".submit_button");
const bookTitle = document.querySelector("#book_title");
const bookAuthor = document.querySelector("#book_author");
const bookPages = document.querySelector("#number_of_pages");
const radioButtons = document.querySelectorAll("[type=radio]");
const libUI = document.querySelector(".library");

let myLibrary = [];
let currentBookIndex = -1;

newBook.addEventListener("click", () => {
  myForm.classList.remove("hide");
});

submit.addEventListener("click", (e) => {
  e.preventDefault();
  addToLibArray();
  createLibDiv();
});

function createLibDiv() {
  let libItem = document.createElement("div");
  libItem.classList.add("book_div");
  libItem.setAttribute("data_libIndex", currentBookIndex);
  libUI.appendChild(libItem);
  createDeleteButton(libItem);
  createInfoDivs(libItem);
}

function addToLibArray() {
  currentBookIndex += 1;
  myLibrary.push(
    new Book(bookTitle.value, bookAuthor.value, bookPages.value, checkRadio())
  );
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
  console.log(currentBookIndex);
  let delButton = document.createElement("button");
  delButton.setAttribute("data_libIndex", currentBookIndex);
  delButton.Obj = myLibrary[currentBookIndex];
  delButton.textContent = "X";
  delButton.classList.add("delete_button");
  libItem.appendChild(delButton);
  delButton.addEventListener("click", function () {
    console.log(delButton.Obj);
    console.log(delButton.Obj.counter())
    myLibrary.splice(delButton.Obj.counter(), 1);
    libItem.remove();
    currentBookIndex -= 1;
    console.log(myLibrary);
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
        libItem_Info.addEventListener("click", changeHaveRead);

        libItem_Info.textContent = myLibrary[currentBookIndex].haveread;
        if (myLibrary[currentBookIndex].opt) {
          libItem_Info.style.backgroundColor = "green";
        } else {
          libItem_Info.style.backgroundColor = "red";
        }
        break;
    }
    libItem.appendChild(libItem_Info);
  }
}

function changeHaveRead() {
  myLibrary[currentBookIndex].changeStatus();
  if (myLibrary[currentBookIndex].opt) {
    this.style.backgroundColor = "green";
  } else {
    this.style.backgroundColor = "red";
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
