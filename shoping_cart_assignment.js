const express = require('express');
const app = express();
const bodyParser = require('body-parser');

class Product{
  constructor(id,name,description,productImage,date,brand,cost){
    this.id = id;
    this.name = name;
    this.description = description;
    this. productImage = productImage;
    this.date = date;
    this.brand = brand;
    this.cost = cost;    
  }
}
let products = [ new Product(63,"Samsung s22 ultra","S22 ultra","https://images.samsung.com/levant/smartphones/galaxy-s22-ultra/buy/S22_Ultra_ProductKV_Black_MO.jpg","2022-12-09T05:03:47.000Z","SAMSUNG",130000),
               new Product(61,"Samsung s22 ultra Pro","S22 ultra legend","https://images.samsung.com/levant/smartphones/galaxy-s22-ultra/buy/S22_Ultra_ProductKV_Black_MO.jpg","2022-12-09T05:03:47.000Z","SAMSUNG",190000)];

app.use(bodyParser.urlencoded({extend:true}));
app.use(bodyParser.json());

//GET /api/v1/products
app.get('/api/v1/products', (req,res)=>{
  res.status(200).json(products);
});

// GET /api/v1/products/:id
app.get('/api/v1/products/:id', (req,res)=>{
  const product = products.find(t => t.id === parseInt(req.params.id));
  if(!product){
    res.response(404).send("Product not found");
  }else{
    res.status(200).json(product);
  }
  
});

// POST /api/v1/products/add

app.post('/api/v1/products/add',(req,res)=>{
  if(!req.body.name){
    res.response(404).send('Name is required');
    return;
  }
  //create porduct
  const new_product = new Product(
    products.length +1,
    req.body.name,
    req.body.description,
    req.body.productImage,
    req.body.date,
    req.body.brand,
    req.body.cost
  );
  products.push(new_product);
  res.response(201).json(new_product);
});


// PUT /api/v1/products/:id

app.put('/api/v1/products/:id',(req,res)=>{
  const update_Product = products.find(t => t.id === parseInt(req.params.id));
  if(!update_Product){
    res.response(404).send("Product not found");
  }else{
    //update
    update_Product.name = req.body.name;
    update_Product.description = req.body.name;
    update_Product.productImage= req.body.productImage;
    update_Product.date = req.body.date;
    update_Product.brand = req.body.date;
    update_Product.cost = req.body.cost;
  }
});


//DELTE /api/v1/products/:id
app.delete('/api/v1/products/:id',(req,res)=>{
  const del_product = products.find(t => t.id === parseInt(req.params.id));
  if(!del_product){
    res.status(404).send("Product not found");
  }
  else{
    const index = products.indexOf(del_product);
    products.splice(index,1);
    res.status(200).send("Product deleted ")
  }
});


const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(port));

