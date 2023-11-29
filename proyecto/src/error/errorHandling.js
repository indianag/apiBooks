function errorHandling(err, req, res, next){
    res.status(500).json({menssage: err.menssage})
}

module.exports = errorHandling;
