const Promise = require('bluebird');

module.exports = class BookService {
  constructor() { }

  getBooks() {
    return new Promise((resolve, reject) => {
      return Book.find()
      .populate('authorId')
        .then((bookList) =>{
          resolve(bookList);
        })
        .catch(err => reject(err));

    });
  }

  updateBook(body) {
    return new Promise((resolve, reject) => {
      const updatedBook = Book.update({ id: body.id })
        .set(body)
        .fetch()
        .catch(err => reject(err));

      resolve(updatedBook)
    });
  }

  borrowBook(bookId, userId) {
    return new Promise((resolve, reject) => {
      const updatedBook = Book.update({ id: bookId })
        .set({ userId: userId })
        .fetch()
        .catch(err => reject(err));

      resolve(updatedBook)
    });
  }

  returnBook(bookId, userId) {
    return new Promise((resolve, reject) => {
      const updatedBook = Book.update({ id: bookId })
        .set({ userId: null })
        .fetch()
        .catch(err => reject(err));

      resolve(updatedBook)
    });
  }
}