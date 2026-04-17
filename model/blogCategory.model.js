import mongoose from "mongoose";

const blogCategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    collection: "blogCategory"
});

const BlogCategory = mongoose.model("BlogCategory", blogCategorySchema);

export default BlogCategory;
