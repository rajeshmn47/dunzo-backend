const express = require('express')
const app = express()
const dotenv = require("dotenv");
const Store = require('./models/store')
const Eskara = require('./models/eskara')
const Product = require('./models/product')
const mongoose = require('mongoose')
const store = require('./controllers/store')
const payment = require('./controllers/payment')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
dotenv.config();
const ATLAS_URI = 'mongodb+srv://rajeshmn47:uni1ver%40se@cluster0.bpxam.mongodb.net/dunzo?retryWrites=true&w=majority'
const cors = require('cors')
const url = 'http://localhost:3000'
const deployedurl = 'https://dunzoclonebyrajesh.netlify.app'
app.use(cors({
  origin: '*'
}));
app.use('/store/', store)
app.use('/payment/', payment)
mongoose.Promise = global.Promise
mongoose.connect(
  ATLAS_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (error) {
    if (error) {
      console.log('Error!' + error)
    }
  }
)
app.get("/", async (req, res) => {
  var a = Store({
    title: 'Chettas Store',
    img_url: 'https://ik.imagekit.io/dunzo/dunzo-catalog-prod/tr:w-250,h-250,cm-pad_resize_store_thumbnail/stores/fdc547de-1ca4-429a-a28f-4e69e80e786a-1605099865702-store_image.jpg',
    maincategory: 'paan', description: 'it is a good product', location: 'Lingarajapuram',
    coordinates: [13.0097, 77.56]
  })
  await a.save();
  console.log(a);
  res.send("API running")
})


app.get("/pushcategories", async (req, res) => {
  var stores = await Store.find()
  var a = stores.filter((s) => (!(s.category.some((f) => f === 'PAAN'))))
  a.forEach(async (b) => {
    b.category.push({ name: 'PAAN' })
    await b.save()
  })
  res.status(200).json({
    'stores': a
  })
})


app.get("/tore", async (req, res) => {
  var stores = await Store.find()
  var a = stores.forEach(async (index, s) => {
    console.log(index)
    if (index === 1) {
      s = 'https://ik.imagekit.io/dunzo/dunzo-catalog-prod/tr:w-168,h-168,cm-pad_resize_store_thumbnail/stores/dVM3T2xQQzRJK2p3VGdEYTQ1STRUUT09-1605688858019-store_image.jpg'
      await s.save()
      console.log(index, s)
    }
  })
  res.send("API running")
})


app.get("/pushcategories", async (req, res) => {
  var stores = await Store.find()
  var a = stores.filter((s) => (!(s.category.some((f) => f === 'PROVISIONS'))))
  a.forEach(async (b) => {
    b.category.push({ name: 'PROVISIONS' })
    await b.save()
  })
  res.status(200).json({
    'stores': a
  })
})


app.get('/createproduct', async (req, res) => {
  const product = Product({
    name: 'Gold Flakes',
    image: 'https://ik.imagekit.io/dunzo/home/icons/home/dunzodaily/Paan_SKU_4x.png',
    subcat: 'PAAN',
    desc: 'It is bad for health',
    price: 330,
    quantity: 20,
    weight: 1,
  })
  await product.save()
  console.log(product)
  res.send("API running")
})
app.get('/findout', async (req, res) => {
  const stores = await Store.find()
  res.status(200).json({
    'stores': stores
  })
})

app.get('/update-stores', async (req, res) => {
  const stores = await Store.find();
  //let storeNo = []
  for (let i = 0; i < stores.length; i++) {
    if (!(stores[i].coordinates)) {
      console.log(stores[i]?.coordinates)
      {/*let s = await Store.updateOne({ _id: stores[i]?._id },
        { $set: { coordinates: [13.0097, 77.56] } },
        { multi: true })
      storeNo.push(s);
      */}
    }
  }
  res.status(200).json({
    'stores': stores
  })
})

app.get('/findouteskara', async (req, res) => {
  const stores = await Eskara.aggregate().near({
    near: {
      type: "Point",
      coordinates: [77.0055, 13.5692],
    },
    maxDistance: 10000000000000000000000000000000000,
    spherical: true,
    distanceField: "dis"
  })

  res.status(200).json({
    'stores': stores
  })
})

app.get("/eskara", async (req, res) => {
  var a = Store({
    title: 'Xpress Mart',
    img_url: 'https://ik.imagekit.io/dunzo/dunzo-catalog-prod/tr:w-220,h-220,cm-pad_resize_store_thumbnail/stores/082e4bbb-9ece-4fca-b4f6-9abbee49d5c1-1699532902032-store_image.jpg',
    maincategory: 'paan', description: 'it is a good product', location: 'Kudlu',
    coordinates: [12.89, 77.66]
  })
  await a.save()
  console.log(a)
  res.send("API running")
})

const PORT = process.env.PORT || 9000
app.listen(PORT, () => {
  console.warn(`App listening on http://localhost:${PORT}`)
  console.log('irseverydaynbro')
})