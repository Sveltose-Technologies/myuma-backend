import mongoose from "mongoose";

const bookNowSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        res : "auth",
        require : true
    },

    itemId :{
        type : String,
        require : true
    },
},
   {
     timestamps : true,
     collection : "booknow"
   }
);



const BookNow = mongoose.model("booknow", bookNowSchema);
export default BookNow;