const bodyParser = require('body-parser')
const Store = require('../models/store')
const Product = require('../models/product')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
var express = require('express')
const { set } = require('express/lib/application')
const router = express.Router()


router.get("/getallstores", async function (req, res, next) {
  console.log(req.params.id)
  const b = await Store.find()
  console.log(b)
  res.status(200).json({
    'stores': b
  })
})


router.get("/getstoredetails/:id", async function (req, res, next) {
  console.log(req.params.id)
  const b = await Store.findById(req.params.id)
  console.log(b)
  res.status(200).json({
    'stores': b
  })
})

router.get("/getproducts", async function (req, res, next) {
  console.log(req.query)
  allqueries = []
  var products = []
  if (req.query.search_text) {
    const queryString = req.query.search_text
    const querystrings = queryString.split(" ")
    querystrings.forEach(element => {
      allqueries.push({ name: { $regex: String(element), $options: "i" } })
    })
    products = await Product.find({ $or: allqueries })
  }
  else {
    products = await Product.find({ subcat: { $eq: req.query.category } })
  }
  console.log(products)
  res.status(200).json({
    'products': products
  })
})
router.get("/product/:id", async function (req, res, next) {
  console.log(req.query)
  const product = await Product.findById(req.params.id)
  console.log(product)
  res.status(200).json({
    'product': product
  })
})

router.get("/search", async function (req, res, next) {
  const queryString = req.query.q;
  console.log(req.query, 'query')
  const querystrings = queryString.split(" ")
  allqueries = []
  querystrings.forEach(element => {
    allqueries.push({ name: { $regex: String(element), $options: "i" } })
  })
  const products = await Product.find({ $or: allqueries })
  allqueriesstores = []
  querystrings.forEach(element => {
    allqueriesstores.push({ title: { $regex: String(element), $options: "i" } })
  })
  const stores = await Store.find({ $and: allqueriesstores });
  let storez;
  if (req.query?.lat && req.query?.long) {
    console.log('recieved lat query')
    storez = await Store.aggregate().near({
      near: {
        type: "Point",
        coordinates: [parseFloat(req.query.lat), parseFloat(req.query.long)],
      },
      maxDistance: 25000,
      spherical: true,
      distanceField: "dis"
    })
  } else {
    storez = await Store.aggregate().near({
      near: {
        type: "Point",
        coordinates: [13, 77],
      },
      maxDistance: 650000,
      spherical: true,
      distanceField: "dis"
    })
  }
  var cat = []
  products.forEach((e) => {
    if (!(cat.includes(e))) {
      cat.push(e.subcat)
    }
  })
  a = new Set(cat)
  cat = Array.from(a);
  var stars = await Store.find()
  storez.filter((s) => (s.category.some((f) => cat.includes(f))))
  res.status(200).json({
    'products': products,
    'stores': stores,
    'categories': cat,
    'stars': storez,
    'storez': storez
  })
})

router.get("/getstores/:q", async function (req, res, next) {
  const queryString = req.params.q
  let storez;
  if (req.query?.lat && req.query?.long) {
    console.log('recieved lat query')
    storez = await Store.aggregate().near({
      near: {
        type: "Point",
        coordinates: [parseFloat(req.query.lat), parseFloat(req.query.long)],
      },
      maxDistance: 6500000000,
      spherical: true,
      distanceField: "dis"
    })
  } else {
    storez = await Store.aggregate().near({
      near: {
        type: "Point",
        coordinates: [12.97, 77.57],
      },
      maxDistance: 6500000000,
      spherical: true,
      distanceField: "dis"
    })
  }
  storez.filter((s) => (s.category.some((f) => f === queryString)))
  console.log(storez)
  res.status(200).json({
    'stores': storez
  })
})
module.exports = router;