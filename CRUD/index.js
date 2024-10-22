const express=require('express')
const app=express()
const User=require('./userschema')
const port=process.env.PORT||4000
const mongoose=require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/userdb")
.then(()=>console.log('connect')
)
.catch((err)=>console.log(err)
)
app.use(express.json())
app.post('/users',async (req,res)=>{
    const {name,age}=req.body
    const user= new User({
 name:name,
 age:age
    })
await user.save()
res.send(user)

   
})
app.get('/users',async (req,res)=>{
    try {
        const findusers= await User.find()
    res.status(200)
    res.json(findusers)

    } catch (error) {
        res.status(404).send({error:'error fetching'})
    }
    
    
})
app.get('/users/:id',async (req,res)=>{
    try {
        const userid=req.params.id
        const findusers= await User.findById(userid)
    res.status(200)
    res.json(findusers)

    } catch (error) {
        res.status(404).send({error:'error fetching'})
    }
    
    
})

app.delete('/users/:id',async(req,res)=>{
    const userid=req.params.id
    await User.findByIdAndDelete(userid)
    res.send('deleted')

})
app.put('/users/:id', async (req,res)=>{
    const userid=req.params.id
    const{name,age}=req.body
    await User.findByIdAndUpdate(userid,{name,age})
    res.send('updated')
})
app.listen(port,()=>{
    console.log(`server running on port ${port}`);
    
})