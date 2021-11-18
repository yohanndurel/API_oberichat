const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {

    function capitalize(text){
        const maj = text.toUpperCase()
        response.json({Initial:text, Capitalized:maj})
    }

    const initial = "Ceci est un texte"
    capitalize(initial)
})

app.get('/users', db.getUsers)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)


app.listen(8080, () => {
    console.log('Serveur à l\'écoute')
})
