import mongoose from "mongoose";

const contactUsSchema = new mongoose.Schema({

    fullName : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    contactNo : {
       type : String,
        require : true,
    },
    address : {
        type : String
    },
   message : {
        type : String,
   }
},
 {
    timestamps : true,
    collation : "contactus"
 }
)

const ContactUs = mongoose.model("contactus", contactUsSchema);

export default ContactUs;