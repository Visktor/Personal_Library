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
  addToLibArray();
  e.preventDefault();
  currentBookIndex += 1;
  let theObjIndex = currentBookIndex;
  let nDiv = document.createElement("div");
  nDiv.classList.add("book_div");
  nDiv.setAttribute("data_libIndex", currentBookIndex);
  libUI.appendChild(nDiv);
  let nButton = document.createElement("button");
  nButton.textContent = "X";
  nButton.classList.add("delete_button");
  nButton.addEventListener("click", function () {
    let ourdiv = document.querySelector(
      `[data_libIndex="${currentBookIndex}"]`
    );
    ourdiv.remove();
  });
  nDiv.appendChild(nButton);
  for (let i = 1; i <= 4; i++) {
    let nnDiv = document.createElement("div");
    nnDiv.classList = `div${i}`;
    switch (i) {
      case 1:
        nnDiv.textContent = `Title: ${myLibrary[currentBookIndex].title}`;
        break;
      case 2:
        nnDiv.textContent = `Author: ${myLibrary[currentBookIndex].author}`;
        break;
      case 3:
        nnDiv.textContent = `Number of Pages: ${myLibrary[currentBookIndex].pages}`;
        break;
      case 4:
        nnDiv.addEventListener("click", () => {
          myLibrary[theObjIndex].changeStatus();
          if (myLibrary[theObjIndex].opt) {
            nnDiv.style.backgroundColor = "green";
          } else {
            nnDiv.style.backgroundColor = "red";
          }
          nnDiv.textContent = myLibrary[theObjIndex].haveread;
        });

        nnDiv.textContent = myLibrary[currentBookIndex].haveread;
        if (myLibrary[theObjIndex].opt) {
          nnDiv.style.backgroundColor = "green";
        } else {
          nnDiv.style.backgroundColor = "red";
        }
        break;
    }
    nDiv.appendChild(nnDiv);
  }
});




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
