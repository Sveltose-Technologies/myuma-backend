import BlogCategory from "../model/blogCategory.model.js";

export const createBlogCategory = async (req, res) => {
    try {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        const existingCategory = await BlogCategory.findOne({ title: title.trim() });

        if (existingCategory) {
            return res.status(400).json({
                message: "Blog Category already exists"
            });
        }

        const newCategory = await BlogCategory.create({
            title: title.trim()
        });

        res.status(201).json({
            message: "Blog category created successfully",
            newCategory
        });

    } catch (error) {
        res.status(500).json({
            message: "Error creating blog category",
            error
        });
    }
};

export const getAllBlogCategories = async (req, res) => {
    try {
        const categories = await BlogCategory.find().sort({ createdAt: -1 });
        res.status(200).json({ message: "Blog categories fetched successfully", count: categories.length, categories });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getBlogCategoryById = async (req, res) => {
    try {
        const category = await BlogCategory.findById(req.params.id);
        if (!category) return res.status(404).json({ message: "Blog category not found" });
        res.status(200).json({ category });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateBlogCategory = async (req, res) => {
    try {
        const { title } = req.body;
        const updatedCategory = await BlogCategory.findByIdAndUpdate(req.params.id, { title }, { new: true });
        if (!updatedCategory) return res.status(404).json({ message: "Blog category not found" });
        res.status(200).json({ message: "Blog category updated successfully", updatedCategory });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteBlogCategory = async (req, res) => {
    try {
        const deletedCategory = await BlogCategory.findByIdAndDelete(req.params.id);
        if (!deletedCategory) return res.status(404).json({ message: "Blog category not found" });
        res.status(200).json({ message: "Blog category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
