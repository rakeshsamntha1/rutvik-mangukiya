const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');

const db=require('./db')

const createBlogRouter=require('./routes/create_blogs')
const app=express()

app.use(bodyParser.json())

app.use(cors())

app.use('/api',createBlogRouter)

const port=process.env.PORT || 5001;

app.listen(port,()=>{
    console.log(`server is running on port no. ${port}`);
})