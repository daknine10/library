const addBtn = document.querySelector(".add");
const modal = document.querySelector(".modal");
const cardContainer = document.querySelector(".container");
const closeBtn = document.querySelector(".close");
const submitBtn = document.querySelector(".submit");
const form = document.querySelector("form");

const myLibrary = [];

function Book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(author, title, pages, read) {
    const book = new Book(author, title, pages, read);
    myLibrary.push(book);
}

function addCard() {
    cardContainer.innerText = ""
    for (let [index, book] of myLibrary.entries()) {
        const card = document.createElement("div");
        card.className = "card";
        cardContainer.dataset.index = index;
        cardContainer.appendChild(card);

        const title = document.createElement("div");
        title.innerText = book.title;
        card.appendChild(title);
        
        const author = document.createElement("div");
        author.innerText = book.author;
        card.appendChild(author);

        const pages = document.createElement("div");
        pages.innerText = book.pages;
        card.appendChild(pages);

        const read = document.createElement("div");
        read.innerText = book.read ? "Read" : "Not read yet";
        card.appendChild(read);

        const removeBtn = document.createElement("button");
        removeBtn.innerText = "Remove";
        removeBtn.addEventListener("click", () =>{
            myLibrary.splice(index, 1)
            addCard();
        })
        card.appendChild(removeBtn);

        const readBtn = document.createElement("button");
        readBtn.className = "read-button";
        readBtn.innerText = book.read ? "Unread" : "Read";
        readBtn.addEventListener("click", () => {
            book.read = book.read ? false : true;
            readBtn.innerText = book.read ? "Unread" : "Read";
            read.innerText = book.read ? "Read" : "Not read yet";
        })
        card.appendChild(readBtn);
    }
}

addBtn.addEventListener("click", () => {
    modal.showModal();
});

closeBtn.addEventListener("click", () => {
    modal.close();
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    addBookToLibrary(form.author.value, form.title.value, form.pages.value, form.read.value);
    addCard();
    form.reset();
    modal.close();
});
