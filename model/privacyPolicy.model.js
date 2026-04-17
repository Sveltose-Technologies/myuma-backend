import mongoose from "mongoose";

const privacyPolicySchema = new mongoose.Schema({
    webLink : {
      type : String
    },

   email : {
    type : String
   },
    content : { 
        type : String
     }  
    
},
{
    timestamps : true,
    collation : "privacyPolicy"
});

const PrivacyPolicy = mongoose.model("privacyPolicy", privacyPolicySchema);

export default PrivacyPolicy;