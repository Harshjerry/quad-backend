const mongoose=require("mongoose");

const HolinfoSchema=new mongoose.Schema(

  {    name:{
                  type:String,
                required:true,
                unique:true
              },
    lastT:{
        type:String,
        required:true,
      },
    buy:{
        type:Number,
        required:true
      },
      sell:{
          type:Number,
          required:true
        },
        volume:{
            type:Number,
            required:true
          },
    base_unit:{
        type:String,
      },

  },{timestamps:true}
);


module.exports=mongoose.model("holinfo",HolinfoSchema);
