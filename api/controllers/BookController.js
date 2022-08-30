module.exports = {
  addBook: function (req, res) {  /* POSTed data */
    var title = req.body ? req.body.title : undefined,
      detail = req.body ? req.body.detail : undefined;
    //technically - once policies in place, this if can be removed as this action couldn't be called unless the user is logged in.
    if (!req.user) {
      return res.badRequest("Cannot add idea without a logged in user");
    } else if (!title && !detail) {
      return res.badRequest("Need a title or detail to create idea");
    } else {
      Book.create({ title: title || '', detail: detail || '' })
        .then((book) => {
          req.user.ideas.add(book);
          req.user.save()
            .then(() => res.json(book))
            .catch((err) => { res.serverError(err) });
        })
        .catch((err) => res.serverError(err));
    }
  },

  getBooks: async (req, res) => {
    const bookService = new BookService();
    return bookService.getBooks()
    .then((result) => {
      res.ok(result);
    })
    .catch((err) => res.serverError(err));
  },

  updateBook: async function (req, res) {    
    const bookService = new BookService();

    return bookService.updateBook(req.body)
    .then((result) => {
      res.ok(result);
    })
    .catch((err) => res.serverError(err));
  },
  
  borrowBook: async function (req, res) {
    const userId = req.body.userId ? req.body.userId : req.user.id;
    
    const bookService = new BookService();

    return bookService.borrowBook(req.body.bookId, userId)
    .then((result) => {
      res.ok(result);
    })
    .catch((err) => res.serverError(err));
  },

  returnBook: async function (req, res) {
    
    const bookService = new BookService();

    return bookService.returnBook(req.body.bookId)
    .then((result) => {
      res.ok(result);
    })
    .catch((err) => res.serverError(err));
  }
};

