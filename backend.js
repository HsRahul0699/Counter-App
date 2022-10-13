const express=require('express')
const app=express()
const cors=require('cors')
const mongoose=require('mongoose')
app.use(express.json())
app.use(cors())
const port =3050
const Schema=mongoose.Schema

mongoose.connect('mongodb://localhost:27017/counter-app')
.then(()=>{
    console.log('Connected to DB')
})
.catch((err)=>{
    console.log(err.message)
})

const counterSchema=new Schema({
    count:{
        type:Number,
        required:true,
        default:0,
        min:0
    }
})

//API's
const Counter=mongoose.model('Counter',counterSchema)

app.get('/api/counters',(req,res)=>{
    Counter.find()
    .then((counters)=>{
        res.json(counters)
    })
   .catch((err)=>{
    res.json(err.message)
   })
})

app.get('/api/counters/:id',(req,res)=>{
    Counter.findById(req.params.id)
    .then((counter)=>{
        res.json(counter)
    })
   .catch((err)=>{
    res.json(err.message)
   })

})

app.post('/api/counters',(req,res)=>{
    const counter=new Counter()
    counter.save()
    .then((counter)=>{
        res.json(counter)
    })
   .catch((err)=>{
    res.json(err.message)
   })
})

app.delete('/api/counters/:id',(req,res)=>{
    Counter.findByIdAndDelete(req.params.id)
    .then((counter)=>{
        res.json(counter)
    })
   .catch((err)=>{
    res.json(err.message)
   })
})

/* app.put('/api/counters/increment/:id',(req,res)=>{
    //1st approach
     Counter.findById(id)
    .then((counter)=>{
        counter.count++
        return counter.save()   //'return' is used as a shorthand. Shorthand for another promise that is returned
    })
    .then((count)=>{
        res.json(count)
    })
    .catch((err)=>{
        res.json(err.message)
    })
 
    //2nd approcah
    Counter.findByIdAndUpdate(req.params.id,{$inc:{count:1}},{new:true,runValidators:true})  //$inc is by default provided by mongoose
    .then((counter)=>{
        res.json(counter)
    })
    .catch((err)=>{
        res.json(err.message)
    })
}) */



app.put('/api/counters/:id',(req,res)=>{
    const id=req.params.id
    const type=req.query.type
    const updateFunc=(id,type)=>{
        if(type=='increment'){
            return Counter.findByIdAndUpdate(id,{$inc:{count:1}},{new:true,runValidators:true})
        }
        else if(type=='decrement'){
           return Counter.findByIdAndUpdate(id,{$inc:{count:-1}},{new:true,runValidators:true})
        }
        else if(type=='reset'){
            return Counter.findByIdAndUpdate(id,{count:0},{new:true,runValidators:true})
        }
        else {
            return new Promise.reject({message:'Invalid type'})
        }
    }
    updateFunc(id,type)
    .then((counter)=>{
        res.json(counter)
    })
    .catch((err)=>{
        res.json(err.message)
    })

})
app.listen(port,()=>{
    console.log('Server is running on port',port)
})