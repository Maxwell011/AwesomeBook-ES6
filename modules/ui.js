import Store from './store.js';

export default class UI {
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const books = document.querySelector('.books');
    const newBook = document.createElement('div');
    newBook.innerHTML = `
      <div class="bookDiv">
        <p id="title" class="bookTitleAuthor">${book.title} by &nbsp; ${book.author}</p>
        <button id="remove" class="delete">Remove</button>
      </div>
    `;
    newBook.classList.add('newBook');
    books.appendChild(newBook);
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector('.title').value = '';
    document.querySelector('.author').value = '';
  }
}
