import Category from "../model/category.model.js";

export const createCategory = async (req, res) => { 
      try {
       const { name } = req.body;
        if (!name) {
          return res.status(400).json({
            success : false,
            message : "Category name is required"
          })
        }
        const category = await Category.create({ name });
        res.status(201).json({
          success : true,
          message : "Category created successfully",
          category
        })
      } catch (error) {
        res.status(500).json({
          success : false,
          message : error.message
        })
      }
};

export const getAllCategories = async (req, res) => {
      try {
        const categories = await Category.find().sort({ createdAt : -1 });  
        res.status(200).json({
          success : true,
          message : "Categories fetched successfully",  
            count : categories.length,
            categories
        })
      }
        catch (error) {
            res.status(500).json({  
                success : false,
                message : error.message
            })
        }   
};

export const getCategoryById = async (req, res) => {
      try {
        const category = await Category.findById(req.params.id);    
        if (!category) {
          return res.status(404).json({
            success : false,    
            message : "Category not found"
          })
        }
        res.status(200).json({  
            success : true, 
            category    
        })
      }
        catch (error) { 
            res.status(500).json({  
                success : false,
                message : error.message
            })
        }   
};

export const updateCategory = async (req, res) => {
      try {
        const { name } = req.body;
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, { name }, { new : true });
        if (!updatedCategory) {
          return res.status(404).json({ 
            success : false,
            message : "Category not found"
          })
        }
        res.status(200).json({  
            success : true,             
            message : "Category updated successfully",
            updatedCategory
        })
      }     
        catch (error) { 
            res.status(500).json({
                success : false,
                message : error.message
            })
        }
}; 

export const deleteCategory = async (req, res) => {
      try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);    
        if (!deletedCategory) { 
            return res.status(404).json({
                success : false,
                message : "Category not found"
            })
        }
        res.status(200).json({  
            success : true, 
            message : "Category deleted successfully"   
        })  
        }       
        catch (error) { 
            res.status(500).json({  
                success : false,
                message : error.message
            })
        }       
};  