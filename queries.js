const {request, response} = require("express");
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'oberichat',
    password: 'root',
    port: 5432,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM personne ORDER BY id ASC',
        (error, results) => {
            if (error) {
                throw error
            }
            else{
                response.status(200).json(results.rows)
            }
        }
    )
}
const createUser = (request, response) => {
    const {nom, prenom} = request.body

    pool.query('INSERT INTO personne (nom, prenom) VALUES ($1, $2)',
        [nom, prenom],
        (error, results) => {
            if(error){
                throw error
            }
            else{
                response.status(201).send('Personne ajoutée')
            }
        }
    )
}

const updateUser = (request, response)=>{
    const id = parseInt(request.params.id)
    const {nom, prenom} = request.body

    pool.query(
        'UPDATE personne SET nom = $1, prenom = $2 WHERE id = $3',
        [nom, prenom, id],
        (error, result)=>{
            if(error){
                throw error
            }
            else{
                response.status(200).send('Personne modifiée')
            }
        }
    )
}

const deleteUser = (request, response)=>{
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM personne WHERE id = $1', [id],
        (error, results)=>{
            if(error){
                throw error
            }
            else{
                response.status(200).send('Personne supprimée')
            }
        }
    )
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}