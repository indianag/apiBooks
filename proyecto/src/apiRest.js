const app = require("./app");




app.listen(app.get("port"), () => {
    console.log("server listen on port " + app.get("port"))
})
