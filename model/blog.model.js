import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    blogCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BlogCategory",
        required: true
    },
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    collection: "blog"
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
