const express = require("express")
const app = express();

//parse json
app.use(express.json())


const validation = (req,res,next)=>{
try {
    if(typeof req.body.a !== 'number' || typeof req.body.b !== 'number'){
        return res.send({'statusCode':400,'message':'Bad request a & b values should be only numbers'})
    }
    next()
} catch (error) {
    return res.send({'statusCode':500,'message':'Internal Server Error'})
}
}

const authentication = (req,res,next)=>{
try {
    if(req.body.role != "ADMIN" ){
        return  res.send({'statusCode':401,'message':'Unauthorized Request'})
      }
      next()
} catch (error) {
    return res.send({'statusCode':500,'message':'Internal Server Error'})
}
}


app.get('/',authentication, validation,(req,res)=>{
    try {
     
        const sum = req.body?.a + req.body?.b;
        return res.send({'statusCode':200,'response': sum})
        
    } catch (error) {
        return res.send({'statusCode':500,'message':'Internal Server Error'})
    }
})


const PORT = 3000
app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`)
})