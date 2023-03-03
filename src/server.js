const express = require('express')
const initConection = require('./db/mongo')
const router = require('./routes/index')
const handlebars = require('express-handlebars')

const app = express()
initConection()

const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname +'./public'))

//definir motor de plantillas
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + "/views")
app.set('view engine', 'handlebars')

app.use(router)

app.listen(PORT, err => {
    if (err) return err
    console.log(`Escuchando en el puerto ${PORT}`)
})