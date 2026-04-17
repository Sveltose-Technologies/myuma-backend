import mongoose from "mongoose";


const aboutUsSchema = new mongoose.Schema({
    
    webLink : {
        type : String,
    },

    email : {
        type : String,
    },
    
    content : {
        type : String,
     }
},
 {
    timestamps : true,
    collation : "aboutUs"
 }
);

const AboutUs = mongoose.model("aboutUs", aboutUsSchema);

export default AboutUs;