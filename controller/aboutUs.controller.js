import AboutUs from "../model/aboutUs.model.js";

export const createAboutUs = async (req, res) => {
  try {
     const {webLink, email, content} = req.body;
     
     const aboutUs = await AboutUs.create({
        webLink,
        email,
        content
     })

     res.status(201).json({
        message : "About Us created successfully",
        aboutUs
     })

  } catch (error) {
     res.status(500).json({ message: error.message });
  }
}

export const getAboutUs = async (req,res) => {
   try {
       const aboutUs = await AboutUs.find().sort({ createdAt: -1 });
       if(!aboutUs){
        return res.status(404).json({
            message : "About Us not found"
        })
       }
       res.status(200).json({
          message : "About Us fetched successfully",
          count : aboutUs.length,
          aboutUs
       })
   } catch (error) {
     res.status(500).json({ message: error.message });
   }
}

export const getAboutUdById = async (req,res) => {
    try {
        const aboutUs = await AboutUs.findById(req.params.id);
         if(!aboutUs){
            return res.status(404).json({
                message : "About Us not found"
            })
         }
        res.status(200).json({ 
            message : "About Us fetched successfully",
            aboutUs 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
  

export const updateAboutUs = async (req,res) => {
    try {
        const aboutUs = await AboutUs.findByIdAndUpdate(req.params.id, req.body, {new : true});
        if(!aboutUs){
            return res.status(404).json({
                message : "About Us not found"
            })
         }
        res.status(200).json({ 
            message : "About Us updated successfully",
            aboutUs 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteAboutUs = async (req,res) => {

  try {
      const aboutUs = await AboutUs.findByIdAndDelete(req.params.id);
      
         if(!aboutUs){
            return res.status(404).json({
                message : "About Us not found"
            })
         }
            res.status(200).json({
            message : "About Us deleted successfully",
      })

  } catch (error) {
     res.status(500).json({message : error.message})
  }

}
