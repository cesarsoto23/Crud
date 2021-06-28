/*jshint esversion: 6 */

const express = require('express');
const Product = require('../models/product');

const path = require('path');


const router = express.Router();


module.exports = router;



//HOME

router.get('/', (req, res)=>{

    
    
    res.render('home');
});

//INSERTAR DATOS
router.get('/insertProduct', (req, res)=>{ 

    res.render('product');

});

router.get('/api/product', (req, res)=>{
//ACCESO A LA BD
    Product.find({}, (err, products)=>{
        if(err) return res.status(500).send({

            message: `Error al realizar la peticion ${err}`
        });

        if (!products) return res.status(404).send({
            message: 'No existen productos'

        });

      

        res.render('showproducts', {products});

    }).lean();

});



router.get('/api/product/:datoBusqueda', (req, res)=>{

    let datoBusqueda = req.params.datoBusqueda;
    Product.findById(datoBusqueda, (err, todoOK)=>{
       

        if(err) return res.status(500).send({
        message: `Error al realizar la peticion ${err}`
    });

    if (!todoOK) return res.status(404).send({
        message: 'El producto no existe'

    });
    res.render('editar', {products: todoOK});



    }).lean();
});

//MODIFICAR PRODUCTO PUT
const putProduct = require('../controllers/putProduct')
router.put('/api/product/:productId', putProduct );


//BORRAR UN REGISTRO DELETE
const delProduct = require('../controllers/delProduct');

router.delete('/api/product/:productId', delProduct);


//INSERTAR VALORES EN LA BD POST
router.post('/api/product', (req, res)=>{

        
        let product = new Product();
        product.name = req.body.name;
        product.picture = req.body.picture;
        product.price = req.body.price;
        product.category = (req.body.category).toLowerCase();
        
        product.description = req.body.description;

        console.log(req.body);

        product.save((err, productStored)=>{

            if(err) return res.status(500).send({
            message: `Error al realizar la peticion ${err}`
        });

        res.redirect('/api/product');
    });

});

//PAGINA LOGIN
const loginController = require('../controllers/login');
router.get('/auth/login', loginController);

    

const loginUserController = require('../controllers/loginUser');
router.post('/users/login', loginUserController);

//REGISTRO A NUEVOS USUARIOS
const newUser = require('../controllers/newUser');

router.get('/users/register', newUser);
    
const newUserController = require('../controllers/storeUser');
router.post('/auth/register', newUserController);



//PAGINA 404 NOTFOUND
router.use((req, res)=>{

    
    res.render('notfound');

});