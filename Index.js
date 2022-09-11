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
  currentBookIndex += 1;
  let libItem = document.createElement("div");
  libItem.classList.add("book_div");
  libItem.setAttribute("data_libIndex", currentBookIndex);
  libUI.appendChild(libItem);
  createDeleteButton(libItem);
  createInfoDivs(libItem);
}

function addToLibArray() {
  myLibrary.push(
    new Book(bookTitle.value, bookAuthor.value, bookPages.value, checkRadio())
  );
}

function checkRadio() {
  radioButtons.forEach((button) => {
    if (button.checked === true) {
      return button.value;
    }
  });
}

function createDeleteButton(libItem) {
  let delButton = document.createElement("button");
  delButton.textContent = "X";
  delButton.classList.add("delete_button");
  libItem.appendChild(delButton);
  delButton.addEventListener("click", function () {
    let ourdiv = document.querySelector(
      `[data_libIndex="${currentBookIndex}"]`
    );
    ourdiv.remove();
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
        libItem_Info.addEventListener("click", () => {
          myLibrary[currentBookIndex].changeStatus();
          if (myLibrary[currentBookIndex].opt) {
            libItem_Info.style.backgroundColor = "green";
          } else {
            libItem_Info.style.backgroundColor = "red";
          }
          libItem_Info.textContent = myLibrary[currentBookIndex].haveread;
        });

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
