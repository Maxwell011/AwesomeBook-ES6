export default class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(title) {
    const books = Store.getBooks();
    // books = books.filter((book) => book.title.split(' ') !== title.split(' '));
    const refinedTitle = title.split(' by')[0];
    console.log(refinedTitle, 'refined');
    books.forEach((book, i) => {
      if (book.title === refinedTitle) {
        books.splice(i, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}
