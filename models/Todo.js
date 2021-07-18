const mongoose=require('mongoose');
const TodoSchema=new mongoose.Schema({
    subject:{
        type:String,
        required:true,
    },
    done:{
        type:Boolean,
        required: true,
        default: false
    },
    userId:{
      type:String,
      required:true
    }

});

module.exports= new mongoose.model("Todo",TodoSchema);
