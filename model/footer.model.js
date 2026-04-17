import mongoose from "mongoose";

const footerSchema = new mongoose.Schema({
    content :{
        type: String,
        trim : true
    },

    address : {
        type: String,
        trim : true
    },

    email : {
        type : String,
        trim : true
    },

    contactNo   : {
        type: String,
        trim : true
    }
},
{
    timestamps : true,
    collection : 'footer-text'
});

const Footer = mongoose.model("footer-text", footerSchema);

export default Footer;