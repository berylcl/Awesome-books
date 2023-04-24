/* eslint-disable max-classes-per-file */

const addNew = document.getElementById('add-new');
const read = document.getElementById('read');
const contact = document.getElementById('contact');
const now = document.getElementById('now');
const go = document.getElementById('go');
const then = document.getElementById('then');
const navitem = document.querySelectorAll('.navitem');

addNew.classList.add('active');
contact.classList.add('active');
now.classList.add('active');

navitem.forEach((item) => {
  item.addEventListener('click', (nav) => {
    const { id } = nav.target;
    if (id === 'go') {
      addNew.classList.remove('active');
      read.classList.add('active');
      contact.classList.add('active');
      go.classList.add('active');
      now.classList.remove('active');
      then.classList.remove('active');
    } else if (id === 'then') {
      contact.classList.remove('active');
      addNew.classList.add('active');
      read.classList.add('active');
      go.classList.remove('active');
      now.classList.remove('active');
      then.classList.add('active');
    } else {
      read.classList.remove('active');
      addNew.classList.add('active');
      contact.classList.add('active');
      go.classList.remove('active');
      now.classList.add('active');
      then.classList.remove('active');
    }
  });
});
class Fdata {
  constructor(id, title, author) {
    this.id = id.toString();
    this.title = title;
    this.author = author;
  }
}
class Books {
  storedbooks = [];

  count = 0;

  constructor(book) {
    this.book = book;
  }

  printbook() {
    const books = document.getElementById('books');
    const bookdata = JSON.parse(window.localStorage.getItem('books'));
    this.storedbooks = bookdata;
    books.replaceChildren();
    let num = 0;
    this.storedbooks.forEach((book) => {
      const newdiv = document.createElement('div');
      num += 1;
      newdiv.innerHTML = `
      <p>
          ${book.title} by ${book.author}
      </p>
      <button type="button" class="remove" id="${book.id}">Remove</button>
         `;
      newdiv.className = 'book';
      if (num % 2 === 0) {
        newdiv.classList.add('two');
      }
      books.append(newdiv);
      this.count = parseInt(book.id, 10);
    });
    const remove = document.querySelectorAll('.remove');
    remove.forEach((rem) => {
      rem.addEventListener('click', (rem) => {
        const { id } = rem.target;
        const btns = document.getElementById(id);
        btns.parentElement.remove();
        this.storedbooks = this.storedbooks.filter((b) => b.id !== id);
        window.localStorage.setItem('books', JSON.stringify(this.storedbooks));
      });
    });
  }

  Addbook(title, author) {
    this.count += 1;
    this.book = new Fdata(this.count, title, author);
    this.storedbooks.push(this.book);
    document.forms[0].reset();
    window.localStorage.setItem('books', JSON.stringify(this.storedbooks));
  }
}

const mystore = new Books();

if (localStorage.getItem('books')) {
  mystore.printbook();
}

const add = document.getElementById('btn');

add.addEventListener('click', () => {
  const booktitle = document.forms[0].elements[0].value;
  const bookauthor = document.forms[0].elements[1].value;
  mystore.Addbook(booktitle, bookauthor);
  mystore.printbook();
});
const dateTime = document.getElementById('time-date');

function updateTime() {
  const date = new Date();
  const dayOfMonth = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  const hour = date.getHours();
  const minutes = date.getMinutes();

  // Add appropriate suffix to dayOfMonth
  let suffix;
  if (dayOfMonth === 1 || dayOfMonth === 21 || dayOfMonth === 31) {
    suffix = 'st';
  } else if (dayOfMonth === 2 || dayOfMonth === 22) {
    suffix = 'nd';
  } else if (dayOfMonth === 3 || dayOfMonth === 23) {
    suffix = 'rd';
  } else {
    suffix = 'th';
  }

  dateTime.textContent = `${month} ${dayOfMonth}${suffix}, ${year} ${hour}:${minutes}`;
}

updateTime();
setInterval(updateTime, 1000);