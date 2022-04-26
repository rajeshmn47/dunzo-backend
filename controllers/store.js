const bodyParser = require('body-parser')
const Store= require('../models/store')
const Product= require('../models/product')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
var express = require('express')
const { set } = require('express/lib/application')
const router = express.Router()


router.get("/getallstores",async function(req, res,next){
    console.log(req.params.id)
    const b=await Store.find()
    console.log(b)
    res.status(200).json({
      'stores': b
    })
  })


  router.get("/getstoredetails/:id",async function(req, res,next){
    console.log(req.params.id)
    const b=await Store.findById(req.params.id)
    console.log(b)
    res.status(200).json({
      'stores': b
    })
  })

  router.get("/getproducts",async function(req, res,next){
    console.log(req.query)
    const products=await Product.find({subcat:{$eq:req.query.category }})
    console.log(products)
    res.status(200).json({
      'products': products
    })
  })
  router.get("/product/:id",async function(req, res,next){
    console.log(req.query)
    const product=await Product.findById(req.params.id)
    console.log(product)
    res.status(200).json({
      'product': product
    })
  })

  router.get("/search",async function(req, res,next){
    const queryString=req.query.q
    const querystrings=queryString.split(" ")
    allqueries=[]
    querystrings.forEach(element=>{
      allqueries.push({name:{$regex:String(element),$options:"i"}})
    })
    const products=await Product.find({$or:allqueries})
    allqueriesstores=[]
    querystrings.forEach(element=>{
      allqueriesstores.push({title:{$regex:String(element),$options:"i"}})
    })
    const stores=await Store.find({$and:allqueriesstores})
   var cat=[]
   products.forEach((e)=>{
     console.log(cat.includes(e))
     if(!(cat.includes(e))){
       console.log(cat)
       console.log(cat.includes(e))
cat.push(e.subcat)
     }
   })
    a=new Set(cat)
    cat=Array.from(a);
    var stars=await Store.find()
stars.filter((s)=>(s.category.some((f)=>cat.includes(f))))
  console.log(stars)
    res.status(200).json({
      'products': products,
      'stores':stores,
      'categories':cat,
      'stars':stars
    })
  })

  router.get("/getstores/:q",async function(req, res,next){
    const queryString=req.params.q
    var stores=await Store.find()
    stores.filter((s)=>(s.category.some((f)=>f===queryString)))
    console.log(stores)
    res.status(200).json({
      'stores': stores
    })
  })
  module.exports = router;