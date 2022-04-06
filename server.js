const express=require('express')
const app=express()


app.get("/",(req,res)=>{
    res.send("API running")
})
app.listen(8000,()=>{console.log('App is running on port 8000')})