const { pool } = require('../database')
const {express} = require('express')


const postUser = async (request, response) => {
    try {
        const { name, last_name, email, photo, password } = request.body;

        // Utiliza parámetros para evitar SQL injection
        const sql = "INSERT INTO user (name, last_name, email, photo, password) VALUES (?, ?, ?, ?, ?)";
        const values = [name, last_name, email, photo, password];

        const [result] = await pool.query(sql, values);
        console.log(result);

        if (result.insertId) {
            response.status(201).json({ userId: result.insertId });
        } else {
            response.status(500).send('Error al registrar el usuario');
        }
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        response.status(500).send('Error interno del servidor');
    }
};


const postLogin = async (request, response) => {
    try {
        let sql = "SELECT * FROM user WHERE email = ? AND password = ?";
        let [result] = await pool.query(sql, [request.body.email, request.body.password]);

        if (result.length > 0) {
            // Usuario autenticado correctamente
            const userWithoutPassword = { ...result[0], password: undefined };
            response.status(200).json(userWithoutPassword);
        } else {
            // Datos de inicio de sesión incorrectos
            response.status(401).send('Credenciales incorrectas');
        }
    } catch (error) {
        console.error("Error al realizar la consulta de inicio de sesión:", error);
        response.status(500).send('Error interno del servidor');
    }
};


const putUser = async (request, response) => {
    try{
        const {name, last_name, email, photo, Id_user} = request.body;
       
        const sql = 'UPDATE user SET name = ?, last_name = ?, email = ?, photo = ? WHERE Id_user = ?';
        const [result] = await pool.query(sql, [name, last_name, email, photo, Id_user]);
        console.log(result)
      
          // Verifica si la actualización fue exitosa
          if (result) {
            response.send({ error: false, codigo: 200, message: "Usuario actualizado correctamente" });
          } else {
            response.status(500).send({ error: true, codigo: 500, message: "No se pudo actualizar el usuario" });
          }
        } catch (error) {
          console.error("Error:", error);
          response.status(500).send({ error: true, codigo: 500, message: "Error interno del servidor" });
        }
      };




module.exports = {
    
    postUser,
    postLogin,
    putUser,
};