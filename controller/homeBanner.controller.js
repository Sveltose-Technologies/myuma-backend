import HomeBanner from "../model/homeBanner.model.js";

export const createHomeBanner = async (req, res) => {
   try {
       
    const { tag, title, contant } = req.body;
    const bannerImage = req.file? `/uploads/${req.file.filename}` : null;

    const newHomeBanner = await HomeBanner.create({
        bannerImage,
        tag, 
        title,
        contant
    })
    res.status(201).json({message : "HomeBanner added successfully", newHomeBanner})
   } catch (error) {
    res.status(500).json({message : "Error creating home banner", error})
   }
}

export const getHomeBanner = async (req, res) => {
    try {
        const homeBanner = await HomeBanner.find().sort({ createdAt: -1 });         
        if (!homeBanner) {
            return res.status(404).json({ message: "HomeBanner not found" });
        }   
        res.status(200).json({
            message : "HomeBanner Data fetched successfully",
            count : homeBanner.length,
            homeBanner });
    }   
    catch (error) {
        console.error("Error fetching home banner:", error);
        res.status(500).json({ message: error.message });
    }
};  

export const getHomeBannerById = async (req,res) => {
     try {
        const homeBanner  = await HomeBanner.findById(req.params.id);
        if (!homeBanner) {
            return res.status(404).json({ 
                message : "HomeBanner Data fetched successfully",
                message: "HomeBanner not found" });
        }   
        res.status(200).json({ homeBanner });

     } catch (error) {
           console.error("Error fetching home banner:", error);
        res.status(500).json({ message: error.message });
     }
}

export const updateHomeBanner = async (req, res) => {
    try {
        const {tag, title, contant } = req.body;
        const bannerImage = req.file? `/uploads/${req.file.filename}` : null;    
        const updatedHomeBanner = await HomeBanner.findByIdAndUpdate(
            req.params.id,  
            { bannerImage,tag, title, contant },   
            { new: true }
        );    
        if (!updatedHomeBanner) {
            return res.status(404).json({ message: "HomeBanner not found" });
        }
        res.status(200).json({ message: "HomeBanner updated successfully", updatedHomeBanner });    
    } catch (error) {
        console.error("Error updating home banner:", error);
        res.status(500).json({ message: error.message });
    }   
};

export const deleteHomeBanner = async (req, res) => {
    try {
        const deletedHomeBanner = await HomeBanner.findByIdAndDelete(req.params.id);        
        if (!deletedHomeBanner) {
            return res.status(404).json({ message: "HomeBanner not found" });
        }   
        res.status(200).json({ message: "HomeBanner deleted successfully" });
    } catch (error) {
        console.error("Error deleting home banner:", error);    
        res.status(500).json({ message: error.message });
    }
};

