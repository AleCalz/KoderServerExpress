/* eslint-disable */
const express = require('express');
const fs = require("node:fs")

const server = express();

server.use(express.json())
const koderFile = 'dbKoderServer.json'

//revisar si el archivo existe o no -- podria ser anonima ??
// (function init (){
function init(){
    if (!fs.existsSync(koderFile)) {
        fs.writeFileSync(koderFile, JSON.stringify({ kodersList:[] }))
    }
}

server.get('/koders', (request,response) => {
    init()
    //leemos
    arrKoders = JSON.parse(fs.readFileSync(koderFile,'utf8')).kodersList

    //le pasamos un objeto
    response.json({
        message:'all Koders',
        koder: arrKoders
    })
})

//agregar un koder
server.post('/koders', (request,response) => {
    
    console.log(request.body);
    const newName = request.body.name
    const newGender = request.body.gender
    const newIsActive = request.body.isActive
    const newGeneration = parseInt(request.body.generation)
    const newAge = parseInt(request.body.age)
    
    //validacion vacios
    if (!newName || !newGeneration || !newGender || !newAge || !newIsActive) {
        response.status(400)
        response.json({
            message:'Faltan datos :c'
        });
        return; 
    }

    if (isNaN(newGeneration) || isNaN(newAge)) {
        response.status(400)
        response.json({
            message:"Edad o Generacion Invalida, Deben ser numeros"
        })
        return
    }
    
    if (newGeneration > 34 || newGeneration <= 0 ) {
        response.status(400)
        response.json({
            message:"Generacion invalida!"
        })
        return
    }else if (newAge < 15){
        response.status(400)
        response.json({
            message:"Edad invalida! debe ser mayor a 15"
        })
        return
    }

    todos.push(newTodo)

    response.json({
        message: 'New koder added!',
        todo : todos
    })
})

//Eliminar un koder
server.delete('/todos/:idx', (request,response) => {
    
    const idxDel = request.params.idx;
    const indexAsInteger = parseInt(idxDel)

    if (isNaN(indexAsInteger)) {
        response.status(400)
        response.json({
            message:"Invalid index, must be a number"
        })
        return
    }
    
    if (indexAsInteger < 0 || indexAsInteger >= todos.length) {
        response.status(400)
        response.json({
            message:"Invalid index, out of bound"
        })
        return
    }

    todos.splice(indexAsInteger,1)
    response.json({
        message:'TODO deleted successfuly',
        todo:todos
    })
})

//Eliminar un koder
server.delete('/todos/:name', (request,response) => {
    const nameDel = request.params.name;
    const indexAsInteger = parseInt(nameDel)

    if (isNaN(indexAsInteger)) {
        response.status(400)
        response.json({
            message:"Invalid index, must be a number"
        })
        return
    }
    
    if (indexAsInteger < 0 || indexAsInteger >= todos.length) {
        response.status(400)
        response.json({
            message:"Invalid index, out of bound"
        })
        return
    }

    todos.splice(indexAsInteger,1)
    response.json({
        message:'TODO deleted successfuly',
        todo:todos
    })
})


server.listen(8080,() => {
    console.log(`Server running on port 8080`);
})