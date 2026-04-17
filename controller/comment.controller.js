import Blog from "../model/blog.model.js";
import Comment from "../model/comment.model.js";

export const sendComment = async (req, res) => {
   try {
        
    const {blogId,  comment} = req.body;
     
    if (!blogId || !comment) {
            return res.status(400).json({
                message: "blogId and comment are required"
            });
        }   

    const blog = await Blog.findById(blogId);

    if (!blog) {
            return res.status(400).json({
                message: "Invalid blogId"
            });
        }

     const newComment = await Comment.create({
        blogId,
        comment
     })
     res.status(201).json({message : "Comment added successfully", newComment})

   } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
   }   
};

export const getAllComments  = async (req,res) => {
   
    try {
        const comments = await Comment.find().sort({ createdAt: -1 });
        res.status(200).json({ message: "Comments fetched successfully", count: comments.length, comments });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
}

export const getCommentById = async (req,res) => {
    try {
        const comment = await Comment.findById(req.params.id);  
        if (!comment) return res.status(404).json({ message: "Comment not found" });
        res.status(200).json({ comment });
    }   
    catch (error) {
      res.status(500).json({
        success: false,     
        message: error.message,
      });
    }
}   

export const deleteComment = async (req,res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        if (!comment) return res.status(404).json({ message: "Comment not found" });    
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {   
        res.status(500).json({      
            success: false, 
            message: error.message, 
        }); 
    }   
};  
export const updateComment = async (req,res) => {
    try {
        const { comment } = req.body;   
        const updatedComment = await Comment.findByIdAndUpdate( 

            req.params.id,
            { comment },
            { new: true }   
        );
        if (!updatedComment) return res.status(404).json({ message: "Comment not found" }); 
        res.status(200).json({ message: "Comment updated successfully", updatedComment });
    } catch (error) {
        res.status(500).json({
            success: false, 
            message: error.message,
        });
    }
};