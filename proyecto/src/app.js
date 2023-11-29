const express = require("express")
const cors = require('cors')
const errorHandling = require("./error/errorHandling")
const userRouter = require('./routers/user.routers')
const booksRouter = require('./routers/books.routers')

const app = express();


app.set("port", process.env.PORT || 3000)


app.use(cors());
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(userRouter);
app.use(booksRouter)
app.use(function(request, response, next)
{
    response.status(404).json({message: "Endpoint doesnt found"})
})

app.use(errorHandling);

module.exports = app;
