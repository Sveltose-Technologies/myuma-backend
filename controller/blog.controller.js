import Blog from "../model/blog.model.js";
import BlogCategory from "../model/blogCategory.model.js";

export const createBlog = async (req, res) => {
    try {
        const { title, description, blogCategoryId } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        const category = await BlogCategory.findById(blogCategoryId);

        if (!category) {
            return res.status(400).json({
                message: "Invalid blogCategoryId"
            });
        }

        const newBlog = await Blog.create({ image, title, description, blogCategoryId });
        res.status(201).json({ message: "Blog created successfully", newBlog });
    } catch (error) {
        res.status(500).json({ message: "Error creating blog", error });
    }
};

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate("blogCategoryId", "title").sort({ createdAt: -1 });
        res.status(200).json({ message: "Blogs fetched successfully", count: blogs.length, blogs });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate("blogCategoryId", "title");
        if (!blog) return res.status(404).json({ message: "Blog not found" });
        res.status(200).json({ blog });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateBlog = async (req, res) => {
    try {
        const { title, description, blogCategoryId } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : undefined;

        const updateData = { title, description };
        if (image) updateData.image = image;
        if (blogCategoryId) updateData.blogCategoryId = blogCategoryId;

        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedBlog) return res.status(404).json({ message: "Blog not found" });
        res.status(200).json({ message: "Blog updated successfully", updatedBlog });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteBlog = async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlog) return res.status(404).json({ message: "Blog not found" });
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
