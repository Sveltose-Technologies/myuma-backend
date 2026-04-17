import mongoose from "mongoose";

const pricingSchema = new mongoose.Schema({
    bannerText : {
        type : String,
    }, 

    Plan : [
        {
            name : {    
                type : String,
            },      
            price : {   
                type : Number,  
               
            },
            features : [String]  
        }
    ],

},
  {
    timestamps : true,
    collection : "pricing"
  }
)

const Pricing = mongoose.model("Pricing", pricingSchema);

export default Pricing;