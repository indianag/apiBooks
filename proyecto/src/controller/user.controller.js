const { pool } = require('../database')


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





module.exports = {
    
    postUser,
    postLogin,
   
};