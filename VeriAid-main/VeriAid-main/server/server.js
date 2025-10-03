const express=require('express')

const app=express()

app.get('/',(req,res)=>{
    res.json({
        message:"endpoint reached"
    })
})

app.listen(3000,console.log("app is running"))