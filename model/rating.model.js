import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "auth",
        require : true
    },

    itemId : {
        type : String,
        require : true,
    },

   rating : {
    type: Number,
    required: true,
    min: 1,
    max: 5,
   },

   comment : {
    type : String
   }

},{
    timestamps : true,
    collection : "rating"
}
);

const Rating = mongoose.model("rating", ratingSchema);

export default Rating;