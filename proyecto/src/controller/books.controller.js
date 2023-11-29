const { pool } = require('../database')

//Devuelve todos los libros almacenados en la BBDD de un usuario.

const getBooksByUserId = async (request, response) => {
  try {
    const id_user = request.query.id_user;
    if (!id_user) {
      return response.status(400).send({ error: true, codigo: 400, mensaje: "Parámetro 'id_user' no proporcionado" });
    }

    const sql = 'SELECT * FROM book WHERE id_user = ?';
    const [result] = await pool.query(sql, [id_user]);

    if (!result.length) {
      response.send({ error: true, codigo: 200, mensaje: "Libros no encontrados para el usuario especificado" });
    } else {
      response.send({ error: false, codigo: 200, mensaje: "Libros encontrados", books: result });
    }
  } catch (error) {
    console.error("Error:", error);
    response.status(500).send({ error: true, codigo: 500, mensaje: "Error interno del servidor" });
  }
};




const getBookByIdAndUserId = async (request, response) => 
{
  try
  {
    const id_user = request.query.id_user;
    const id_book = request.query.id_book;

    if(!id_user || !id_book){
      return response.status(400).send({error: true, codigo: 400, mensaje: "Parámetros 'id_user' e 'id_book' son necesarios"})
    }
    const sql = 'SELECT * FROM book WHERE id_user = ? AND id_book = ?';
    const [result] = await pool.query(sql, [id_user, id_book]);

    if(!result.length){
      response.send({ error: true, codigo: 200, mensaje: "Libro no encontrado para el usuario especificado" });
    } else {
      response.send({ error: false, codigo: 200, mensaje: "Libro encontrado", book: result[0] });
    }
  } catch(error){
    console.error("Error:", error);
    response.status(500).send({ error: true, codigo: 500, mensaje: "Error interno del servidor" });
  }
}





//Añade un nuevo libro a la BBDD asociado a un usuario.

const addBook = async (request, response) => {
  try {
    const {id_user, title, type, author, price, photo} = request.body;

    // Verifica que los datos necesarios estén presentes en la solicitud
    if (!id_user || !title || !type || !author || !price || !photo) {
      return response.status(400).send({ error: true, codigo: 400, mensaje: "Datos incompletos para agregar un nuevo libro" });
    }

    // Realiza la inserción en la base de datos
    const sql = 'INSERT INTO book (Id_user, title, type, author, price, photo) VALUES (?, ?, ?, ?, ?, ?)';
    const [result] = await pool.query(sql, [id_user, title, type, author, price, photo]);

    // Verifica si la inserción fue exitosa
    if (result.affectedRows === 1) {
      response.send({ error: false, codigo: 201, mensaje: "Libro añadido correctamente" });
    } else {
      response.status(500).send({ error: true, codigo: 500, mensaje: "No se pudo agregar el libro" });
    }
  } catch (error) {
    console.error("Error:", error);
    response.status(500).send({ error: true, codigo: 500, mensaje: "Error interno del servidor" });
  }
};



  //Actualiza la información de un libro de la BBDD.
  const updateBook = async (request, response) => {
    try {
      const {id_book, title, type, author, price, photo} = request.body;
  
      // Verifica que los datos necesarios estén presentes en la solicitud
      if (!id_book || !title || !type || !author || !price || !photo) {
        return response.status(400).send({ error: true, codigo: 400, mensaje: "Datos incompletos para actualizar el libro" });
      }
  
      // Realiza la actualización en la base de datos
      const sql = 'UPDATE book SET title = ?, type = ?, author = ?, price = ?, photo = ? WHERE id_book = ?';
      const [result] = await pool.query(sql, [ title, type, author, price, photo, id_book]);
      console.log(result)
  
      // Verifica si la actualización fue exitosa
      if (result.affectedRows === 1) {
        response.send({ error: false, codigo: 200, mensaje: "Libro actualizado correctamente" });
      } else {
        response.status(500).send({ error: true, codigo: 500, mensaje: "No se pudo actualizar el libro" });
      }
    } catch (error) {
      console.error("Error:", error);
      response.status(500).send({ error: true, codigo: 500, mensaje: "Error interno del servidor" });
    }
  };



  //Elimina el libro de la BBDD.
  const deleteBook = async (request, response) => {
    try {
      const id_book = request.params.id;
  
      // Verifica que el ID del libro esté presente en la solicitud
      if (!id_book) {
        return response.status(400).send({ error: true, codigo: 400, mensaje: "ID del libro no proporcionado" });
      }
  
      // Realiza la eliminación en la base de datos
      const sql = 'DELETE FROM book WHERE id_book = ?';
      const result = await pool.query(sql, [id_book]);
  
      // Verifica si la eliminación fue exitosa
      if (result.affectedRows === 1) {
        response.send({ error: false, codigo: 200, mensaje: "Libro eliminado correctamente" });
      } else {
        response.status(404).send({ error: true, codigo: 404, mensaje: "Libro no encontrado para eliminar" });
      }
    } catch (error) {
      console.error("Error:", error);
      response.status(500).send({ error: true, codigo: 500, mensaje: "Error interno del servidor" });
    }
  };


module.exports = {
    getBooksByUserId,
    getBookByIdAndUserId,  
    addBook,
    updateBook,
    deleteBook,
};
