const {Router} = require ("express")
const router = Router();
const booksCtrl = require ("../controller/books.controller")


//Devuelve todos los libros almacenados en la BBDD de un usuario.
////*********http://localhost:3000/books/3***********/////////////
router.get('/books', booksCtrl.getBooksByUserId);

//Devuelve los datos del libro cuyo id corresponda con el de
//la BBDD y sea del usuario especificado por su id_usuario.
//// Defino la ruta con parámetros "id_user" e "id_book" (ambos)
///////*****************http://localhost:3000/book?id_user=3&id_book=10****** */
router.get('/book', booksCtrl.getBookByIdAndUserId);


//Añade un nuevo libro a la BBDD asociado a un usuario.
// defino la ruta y consulto por body
////*************http://localhost:3000/books */
// ejemplo para el body
// {
//   "id_user": "Pepe",
//   "title": "Libro Nuevo",
//   "type": "Tapa Blanda",
//   "author": "Autor Nuevo",
//   "price": 20.35,
//   "photo": "nueva/foto.jpg"
// }
router.post('/books', booksCtrl.addBook);


//Actualiza la información de un libro de la BBDD.
// defino la ruta y consulto por body
////*************http://localhost:3000/books */
//// ejemplo para el body
// {
//     "title": "Libro Nuevo",
//     "type": "Tapa Blanda",
//     "author": "Autor Nuevo",
//     "price": 20.35,
//     "photo": "nueva/foto.jpg",
//     "id_book": 3
//   }
router.put('/books', booksCtrl.updateBook);


//Elimina el libro de la BBDD.
////**************************DELETE http://localhost:3000/books/1 /// */
router.delete('/books', booksCtrl.deleteBook);





 module.exports = router;
