import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    blogId : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"blog",
    },
    
    comment:{
        type:String,
    }
    
  },
  {
    timestamps : true,
    collection : "comment"
  }

)

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;