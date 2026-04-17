import Logo from "../model/logo.model.js";

export const addLogo = async (req, res) => {
    try {
      const logo = req.file ? `/uploads/${req.file.filename}` : null;

          const newlog = await Logo.create({
            logo
          })
            res.status(201).json({message : "Logo added successfully", newlog})

    } catch (error) {   
        console.error("Error adding logo:", error); 
        res.status(500).json({ message: error.message });  
    }
};

export const getLogo = async (req, res) => {
    try {
      const logo = await Logo.findOne().sort({ createdAt: -1 });            
        if (!logo) {
            return res.status(404).json({ message: "Logo not found" });
        }
        res.status(200).json({
            message : "Logo fetched successfully",
            count : logo.length,
            logo });
    } catch (error) {
        console.error("Error fetching logo:", error);   
        res.status(500).json({ message: error.message });
    }
};  

export const getLogoById = async (req, res) => {
    try {
      const logo = await Logo.findById(req.params.id);
        if (!logo) {
            return res.status(404).json({ message: "Logo not found" });
        }
        res.status(200).json({ logo });
    } catch (error) {
        console.error("Error fetching logo:", error);
        res.status(500).json({ message: error.message });
    }
};

export const updateLogo = async (req, res) => {
    try {
      const logo = req.file ? `/uploads/${req.file.filename}` : null;       
        const updatedLogo = await Logo.findByIdAndUpdate(
            req.params.id,  
            { logo },   
            { new: true }
        );      
        if (!updatedLogo) {
            return res.status(404).json({ message: "Logo not found" });
        }   
        res.status(200).json({ message: "Logo updated successfully", updatedLogo });
    } catch (error) {   
        console.error("Error updating logo:", error);
        res.status(500).json({ message: error.message });
    }   
};

export const deleteLogo = async (req, res) => {
    try {
        const deletedLogo = await Logo.findByIdAndDelete(req.params.id);            
        if (!deletedLogo) { 
            return res.status(404).json({ message: "Logo not found" }); 
        }
        res.status(200).json({ message: "Logo deleted successfully" });
    }       
    catch (error) {
        console.error("Error deleting logo:", error);
        res.status(500).json({ message: error.message });
    }       
};  
