import mongoose from "mongoose";

const termconditionSchema = new mongoose.Schema({
    
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
    collation : "termcondition"
 }
);

const TermCondition = mongoose.model("termcondition", termconditionSchema);

export default TermCondition;