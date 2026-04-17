import mongoose from "mongoose";

const logoSchema = new mongoose.Schema({
    logo : {
        type : String,
        required : true
    }
}, 
{ 
    timestamps : true,
     collection : "logo"
}  
) 

const Logo = mongoose.model("Logo", logoSchema);

export default Logo;