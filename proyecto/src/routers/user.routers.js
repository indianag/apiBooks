const {Router} = require ("express");
const express = require('express');
const router = Router();
const userCtrl = require ("../controller/user.controller")


// Endpoint para añadir un nuevo usuario
router.post("/register", userCtrl.postUser);

router.post("/login", userCtrl.postLogin);

router.put('/usuarios', userCtrl.putUser);

module.exports = router;