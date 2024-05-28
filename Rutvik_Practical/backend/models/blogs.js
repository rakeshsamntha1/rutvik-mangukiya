const mongoose=require('mongoose');

const blogschema=new mongoose.Schema({
    blog_title:{
        type:String,
        require:true
    },
    blog_des:{
        type:String,
        require:true
    },
    blog_category:{
        type:String,
        require:true
    },
    blog_publish_date:{
        type:Date,
        require:true
    },
    status:{
        type:String,
        enum:['enable','disable'],
        default:'enable'

    }
})
module.exports=mongoose.model('bs_blog',blogschema)