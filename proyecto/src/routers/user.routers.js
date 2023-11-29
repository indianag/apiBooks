const {Router} = require ("express")
const router = Router();
const userCtrl = require ("../controller/user.controller")


// Endpoint para añadir un nuevo usuario
router.post("/register", userCtrl.postUser);

router.post("/login", userCtrl.postLogin);

module.exports = router;