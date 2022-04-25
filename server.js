const express=require('express')
const app=express()
const dotenv = require("dotenv");
const Store=require('./models/store')
const Product=require('./models/product')
const mongoose=require('mongoose')
const store = require('./controllers/store')
const payment = require('./controllers/payment')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
dotenv.config();
const ATLAS_URI ='mongodb+srv://rajeshmn47:uni1ver%40se@cluster0.bpxam.mongodb.net/dunzo?retryWrites=true&w=majority'
const cors=require('cors')
const url = 'http://localhost:3000'
app.use(cors({ origin: url, credentials: true }))
app.use('/store/',store)
app.use('/payment/',payment)
mongoose.Promise = global.Promise
mongoose.connect(
    'mongodb://127.0.0.1:27017/dunzo',
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (error) {
    if (error) {
      console.log('Error!' + error)
    }
  }
)
app.get("/",async(req,res)=>{
    var a=Store({title:'nandus',img_url:'https://ik.imagekit.io/dunzo/dunzo-catalog-prod/tr:w-168,h-168,cm-pad_resize_store_thumbnail/stores/39db1310-786d-4f1f-8959-a885d790ba52-1630661520568-store_image.jpg',
    maincategory:'meat-and-fish-stores',description:'it is a good product',location:'Rajajinagar',})
    await a.save()
    console.log(a)
    res.send("API running")
})

app.get("/pushcategories",async(req,res)=>{
    var a=await Store.find()
    a.forEach(async(b) => {
b.category.push({name:'PROVISIONS'})
await b.save()
    })
    res.send("API running")
})
app.get('/createproduct',async(req,res)=>{
  const product=Product({  name:'Sona Masoori Rice',
    image:'https://ik.imagekit.io/dunzo/tr:w-100,h-100,cm-pad_resize/eGZucmFCbUVRVGNTQVVBKzA5YXlJZz09-product_image.jpg',   
    subcat:'PROVISIONS',
    desc:'It is a good vegetable for health',
    price:115,
    quantity:1,
    weight:1,})
  await product.save()
  console.log(product)
  res.send("API running")
})
app.get('/findout',async(req,res)=>{
    console.log(await Store.find())
})

const PORT = process.env.PORT || 9000
app.listen(PORT, () => {
      console.warn(`App listening on http://localhost:${PORT}`)
    })