import Store from './modules/store.js';
import UI from './modules/ui.js';
import { DateTime } from './modules/luxon.js';

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// EVENT TO DISPLAY BOOKS
document.addEventListener('DOMContentLoaded', UI.displayBooks);
// EVENT TO ADD A BOOK
document.querySelector('.bookForm').addEventListener('submit', (e) => {
  e.preventDefault();
  // get form values
  const titleInput = document.querySelector('.title').value;
  const authorInput = document.querySelector('.author').value;
  if (titleInput !== '' && authorInput !== '') {
    const book = new Book(titleInput, authorInput);
    UI.addBookToList(book);
    Store.addBook(book);
    UI.clearFields();
  } else {
    // eslint-disable-next-line no-alert
    alert('Please enter book tile and author');
  }
});
// EVENT DELETE
document.querySelector('.books').addEventListener('click', (e) => {
  if (e.target.className === 'delete') {
    const id = e.target.previousElementSibling.innerText;
    Store.removeBook(id);
    UI.deleteBook(e.target);
  }
});

const date = document.getElementsByClassName('date')[0];
date.innerText = DateTime.now().toLocaleString({
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
});

const app = {
  pages: [],
  show: new Event('show'),
  init() {
    app.pages = document.querySelectorAll('.page');
    app.pages.forEach((pg) => {
      pg.addEventListener('show', app.pageShown);
    });

    document.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', app.nav);
    });
  },
  nav(ev) {
    ev.preventDefault();
    const currentPage = ev.target.getAttribute('data-target');
    document.querySelector('.active').classList.remove('active');
    document.getElementById(currentPage).classList.add('active');
    document.getElementById(currentPage).dispatchEvent(app.show);
  },
};

document.addEventListener('DOMContentLoaded', app.init);
