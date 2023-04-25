class BookCollection {
  constructor() {
    this.bookList = document.getElementById('book-list');
    this.addBookForm = document.getElementById('add-book-form');
    this.titleInput = document.getElementById('title-input');
    this.authorInput = document.getElementById('author-input');

    this.books = [];

    // Load books from localStorage
    if (localStorage.getItem('books')) {
      this.books = JSON.parse(localStorage.getItem('books'));
    }

    // Render book list and add/remove book functionality
    this.renderBooks();
    this.addBookForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.addBook();
    });
  }

  addBook() {
    const title = this.titleInput.value.trim();
    const author = this.authorInput.value.trim();

    if (title && author) {
      this.books.push({ title, author });
      localStorage.setItem('books', JSON.stringify(this.books));

      this.titleInput.value = '';
      this.authorInput.value = '';

      this.renderBooks();
    }
  }

  removeBook(book) {
    this.books = this.books.filter((b) => b !== book);
    localStorage.setItem('books', JSON.stringify(this.books));
    this.renderBooks();
  }

  renderBooks() {
    this.bookList.innerHTML = '';

    this.books.forEach((book) => {
      const li = document.createElement('li');

      const title = document.createElement('span');
      title.textContent = book.title;
      title.classList.add('book-title');
      li.appendChild(title);

      const author = document.createElement('span');
      author.textContent = `by ${book.author}`;
      author.classList.add('book-author');
      li.appendChild(author);

      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.classList.add('remove-button');
      removeButton.addEventListener('click', () => {
        this.removeBook(book);
      });

      li.appendChild(removeButton);
      this.bookList.appendChild(li);
    });
  }
}

const myBookCollection = new BookCollection();
myBookCollection.renderBooks();
myBookCollection.addBookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  myBookCollection.addBook();
});
