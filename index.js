const express = require("express")
const  app = express()

const  chickenrouter = require("./Routes/Chicken")

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use("/api/chicken", chickenrouter)

const PORT =process.env.PORT || 3000

// Démarrage du serveur
app.listen(PORT, ()=>{

    console.log("server Running.......")

})
