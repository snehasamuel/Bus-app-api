const Express=require("express")
const Mongoose=require("mongoose")
const Bodyparser=require("body-parser")
const res = require("express/lib/response")

let app=Express()

app.use(Bodyparser.urlencoded({extended:true}))
app.use(Bodyparser.json())
app.use((req, res, next) => { 
    res.setHeader("Access-Control-Allow-Origin", "*");  
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"   ); 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS"   ); 
    next(); });

var busModel=Mongoose.model("Buses",
new Mongoose.Schema({
    route:String,
    busname:String,
    register:String,
    owner:String,
    phone:String

}))


Mongoose.connect("mongodb+srv://snehasam:snehasa4@cluster0.yyrcr.mongodb.net/BusDatabase")

app.post("/api/addbus",(req,res)=>{
    var getRoute=req.body.route
var getBus=req.body.busname
var getRegister=req.body.register 
var getOwner=req.body.owner
var getPhone=req.body.phone 
var data={"route":getRoute,"busname":getBus,"register":getRegister,"owner":getOwner,"phone":getPhone}

let mybus=new busModel(data) 
mybus.save((error,data)=>{
    if(error)
    {
        res.send({"status":"error","data":error})
}
else
{
res.send({"status":"success","data":data})
}
})
})


app.get("/api/viewbus",(req,res)=>{
busModel.find((error,data)=>{
    if(error)
    {
        res.send(error)
    }
    else
    {
        res.send(data)
    }
})
})



app.listen(8000,()=>
{
    console.log("server running=>http://localhost:8000/api/viewbus")
})