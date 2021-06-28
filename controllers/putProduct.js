/*jshint esversion: 6*/

const Product = require("../models/product");

module.exports =(req, res)=>{

    let datoModificar = req.params.productId;

    let update = req.body;

    console.log(datoModificar);
    console.log(update);

    Product.findByIdAndUpdate(datoModificar, update, (err, products)=>{

        if(err) return res.status(500).send({
            message: `Error al actualizar el producto ${err}`
        });
    
        if (!products) return res.status(404).send({
            message: 'El producto no existe'
    
        });
        
        res.redirect('/api/product');
    
        

    });

};