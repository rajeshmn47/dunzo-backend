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
const deployedurl='https://dunzoclonebyrajesh.netlify.app'
app.use(cors({ origin:deployedurl, credentials: true }))
app.use('/store/',store)
app.use('/payment/',payment)
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
app.get("/",async(req,res)=>{
    var a=Store({title:'thebetel leef co',img_url:'https://ik.imagekit.io/dunzo/dunzo-catalog-prod/tr:w-168,h-168,cm-pad_resize_store_thumbnail/stores/39db1310-786d-4f1f-8959-a885d790ba52-1630661520568-store_image.jpg',
    maincategory:'paan',description:'it is a good product',location:'Sheshadripuram',})
    await a.save()
    console.log(a)
    res.send("API running")
})

app.get("/pushcategories",async(req,res)=>{
    var stores=await Store.find()
    var a=stores.filter((s)=>(!(s.category.some((f)=>f==='PROVISIONS'))))
    a.forEach(async(b) => {
b.category.push({name:'PROVISIONS'})
await b.save()
    })
    res.send("API running")
})


app.get('/createproduct',async(req,res)=>{
  const product=Product({  name:'Gold Flakes',
    image:'https://ik.imagekit.io/dunzo/home/icons/home/dunzodaily/Paan_SKU_4x.png',   
    subcat:'PAAN',
    desc:'It is bad for health',
    price:330,
    quantity:20,
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