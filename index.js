'use strict'

const express = require('express')
const mongoose = require('mongoose')

const config = require('./config')
const hbs = require('express-handlebars')

const router = require('./routers/routes')

const app =express()



const methodOverride = require('method-override')
app.use(methodOverride('_method'))

//body parse acepta los recursos
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//motor de vistas handlebars
app.engine('.hbs', hbs({

    defaultLayout : 'index',
    extname : '.hbs'
}))

app.set('view engine', '.hbs')

//recursos publicos
app.use('/static', express.static('/public'))


app.use('/', router)



mongoose.connect(config.db, config.urlParser,(err, res)=>{

    if(err){
return console.log(`Error al conectar en la base de datos ${err}`)

    }
    console.log('Conexion a la BD exitosa')
    app.listen(config.port, ()=>{

        console.log(`Executando en http://localhost:${config.port}`)
    })
})



