const express = require("express");
const router = express.Router();
const docs_controller = require("../controllers/docsController");
const docs_groupController = require("../controllers/docs_groupController");
// Требующиеся модули контроллеров.
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

function checkMultipart(req, res, next) {
  const contentType = req.headers["content-type"];
  // Make sure it's multipart/form
  if (!contentType || !contentType.includes("multipart/form-data")) {
    // Stop middleware chain and send a status
    return res.sendStatus(500);
  }
  next();
}
function rewriter(req, res, next) {
  // Set the request fields that you want
  req.body.avatarUri = req.file.destination + req.file.filename;
  next();
}

router.post("/group/", docs_groupController.index);
router.post(
  "/group/new",
  checkMultipart,
  upload.single("avatar"),
  rewriter,
  docs_groupController.docs_group_create_post
);
router.post("/group/:id", docs_groupController.docs_group_detail_post);
router.post("/group/:id/edit/", docs_groupController.docs_group_edit_post);
router.post("/group/:id/del/", docs_groupController.docs_group_del_post);

router.post("/", docs_controller.index);
router.post("/new", docs_controller.docs_create_post);
router.post("/:id", docs_controller.docs_detail_post);
router.post("/:id/edit/", docs_controller.docs_edit_post);
router.post("/:id/del/", docs_controller.docs_del_post);

module.exports = router;

// router.get('/cool', function (req, res, next) {
//   res.send('Мы крутые');
// });
// router.get('/cool', function (req, res, next) {
//   res.send('Мы крутые');
// });

// router.get('/cool', function (req, res, next) {
//   res.send('Мы крутые');
// });
// var book_controller = require('../controllers/bookController');
// var author_controller = require('../controllers/authorController');
// var genre_controller = require('../controllers/genreController');
// var book_instance_controller = require('../controllers/bookinstanceController');

// /// BOOK ROUTES МАРШРУТЫ КНИГ///

// // GET catalog home page.
// router.get('/', book_controller.index);

// // GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
// // GET запрос для создания книги. Должен появиться до маршрута, показывающего книгу(использует id)
// router.get('/book/create', book_controller.book_create_get);

// // POST request for creating Book.
// router.post('/book/create', book_controller.book_create_post);

// // GET request to delete Book.
// router.get('/book/:id/delete', book_controller.book_delete_get);

// // POST request to delete Book.
// router.post('/book/:id/delete', book_controller.book_delete_post);

// // GET request to update Book.
// router.get('/book/:id/update', book_controller.book_update_get);

// // POST request to update Book.
// router.post('/book/:id/update', book_controller.book_update_post);

// // GET request for one Book.
// router.get('/book/:id', book_controller.book_detail);

// // GET request for list of all Book items.
// router.get('/books', book_controller.book_list);

// /// AUTHOR ROUTES ///

// // GET request for creating Author. NOTE This must come before route for id (i.e. display author).
// // GET-запрос для создания автора. Должен появиться до маршрута для id (для вывода автора)
// router.get('/author/create', author_controller.author_create_get);

// // POST request for creating Author.
// router.post('/author/create', author_controller.author_create_post);

// // GET request to delete Author.
// router.get('/author/:id/delete', author_controller.author_delete_get);

// // POST request to delete Author.
// router.post('/author/:id/delete', author_controller.author_delete_post);

// // GET request to update Author.
// router.get('/author/:id/update', author_controller.author_update_get);

// // POST request to update Author.
// router.post('/author/:id/update', author_controller.author_update_post);

// // GET request for one Author.
// router.get('/author/:id', author_controller.author_detail);

// // GET request for list of all Authors.
// router.get('/authors', author_controller.author_list);

// /// GENRE ROUTES ///

// // GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
// // GET-запрос для создания жанра. Должен появиться до маршрута, выводящего жанр (( с использованием id)
// router.get('/genre/create', genre_controller.genre_create_get);

// //POST request for creating Genre.
// router.post('/genre/create', genre_controller.genre_create_post);

// // GET request to delete Genre.
// router.get('/genre/:id/delete', genre_controller.genre_delete_get);

// // POST request to delete Genre.
// router.post('/genre/:id/delete', genre_controller.genre_delete_post);

// // GET request to update Genre.
// router.get('/genre/:id/update', genre_controller.genre_update_get);

// // POST request to update Genre.
// router.post('/genre/:id/update', genre_controller.genre_update_post);

// // GET request for one Genre.
// router.get('/genre/:id', genre_controller.genre_detail);

// // GET request for list of all Genre.
// router.get('/genres', genre_controller.genre_list);

// /// BOOKINSTANCE ROUTES ///

// // GET request for creating a BookInstance. NOTE This must come before route that displays BookInstance (uses id).
// // GET-запрос для создания экземпляра книги. Должен появиться до маршрута, выводящего BookInstance с использованием id
// router.get('/bookinstance/create', book_instance_controller.bookinstance_create_get);

// // POST request for creating BookInstance.
// router.post('/bookinstance/create', book_instance_controller.bookinstance_create_post);

// // GET request to delete BookInstance.
// router.get('/bookinstance/:id/delete', book_instance_controller.bookinstance_delete_get);

// // POST request to delete BookInstance.
// router.post('/bookinstance/:id/delete', book_instance_controller.bookinstance_delete_post);

// // GET request to update BookInstance.
// router.get('/bookinstance/:id/update', book_instance_controller.bookinstance_update_get);

// // POST request to update BookInstance.
// router.post('/bookinstance/:id/update', book_instance_controller.bookinstance_update_post);

// // GET request for one BookInstance.
// router.get('/bookinstance/:id', book_instance_controller.bookinstance_detail);

// // GET request for list of all BookInstance.
// router.get('/bookinstances', book_instance_controller.bookinstance_list);

// module.exports = router;
