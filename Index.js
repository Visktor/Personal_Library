const newBook = document.querySelector(".new_book");
const myForm = document.querySelector("form");
const submit = document.querySelector(".submit_button");
const bTitle = document.querySelector("#book_title");
const bAuthor = document.querySelector("#book_author");
const bPages = document.querySelector("#number_of_pages");
const rButtons = document.querySelectorAll("[type=radio]");
const libUI = document.querySelector(".library")

let myLibrary = [];
let currentBookIndex = -1;

newBook.addEventListener("click", () => {
  myForm.classList.remove("hide");
});

submit.addEventListener("click", (e) => {
  let myRadio;
  rButtons.forEach((button) => {
    if (button.checked === true) {
      myRadio = button.value;
      console.log(myRadio);
    }
  });
  myLibrary.push(new Book(bTitle.value, bAuthor.value, bPages.value, myRadio));
  e.preventDefault();
  currentBookIndex += 1;
  
});

function Book(title, author, pages, haveread) {
  (this.title = title), (this.author = author), (this.pages = pages);
  if (haveread === "yes") {
    this.haveread = "Already read";
  } else {
    this.haveread = "Haven't read yet";
  }
}

