/* eslint-disable */
const express = require('express');
const fs = require("node:fs")

const server = express();

server.use(express.json())
const koderFile = 'dbKoderServer.json'

function init(){
    if (!fs.existsSync(koderFile)) {
        fs.writeFileSync(koderFile, JSON.stringify({ kodersList:[] }))
    }
}
init()

function listaKoders() {
    const arrKoders = JSON.parse(fs.readFileSync(koderFile,'utf8')).kodersList
    return arrKoders
}

server.get('/koders', (request,response) => {

    response.json({
        message:'all Koders',
        kodersList: listaKoders()
    })
})

//agregar un koder
server.post('/koders', (request,response) => {
    const arrayKoders = listaKoders()

    const newkoder = request.body
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
    arrayKoders.push(newkoder)
    updateKoders(arrayKoders)
    response.json({
        message: 'New koder added!',
        kodersList : newkoder
    })
})

//Eliminar un koder --- nada
server.delete('/koders/:name', (request,response) => {
    const arrayKoders = listaKoders()
    const nameDel = request.params.name;

    arrayKodersDel = arrayKoders.filter( objKoderIterable => objKoderIterable.name !== nameDel)
    // console.log( 'array sin elemento eliminado: ', arrayKodersDel );

    updateKoders(arrayKodersDel)
    response.json({
        message:'koder deleted successfuly',
        kodersList:arrayKodersDel
    })
})

//Eliminar todos los koder
server.delete('/koders', (request,response) => {
    
    updateKoders([])
    response.json({
        message:'Koders deleted successfuly',
        kodersList:[]
    })
})


function updateKoders(koders) {
    const newObjectKoder = { kodersList: koders}
    fs.writeFileSync(koderFile, JSON.stringify(newObjectKoder))
}

server.listen(8080,() => {
    console.log(`Server running on port 8080`);
})