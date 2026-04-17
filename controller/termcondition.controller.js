import TermCondition from "../model/termcondition.model.js";

export const createTermcondition = async (req, res) => {
     try {
          const {webLink, email, content} = req.body;
           const termcondition = await TermCondition.create({
              webLink,
              email,
              content
           })
              res.status(201).json({        
                    message : "Term & Condition created successfully",
                    termcondition
              })    

     } catch (error) {
        res.status(500).json({ message: error.message });
     }
};

export const getTermcondition = async (req,res) => {
   try {
        const termcondition = await TermCondition.find().sort({ createdAt: -1 });
        if(!termcondition){
            return res.status(404).json({
                message : "Term & Condition not found"
            })
        }
        res.status(200).json({ 
            message : "Term & Condition fetched successfully",
            count : termcondition.length,
            termcondition });
   } catch (error) {
        res.status(500).json({ message: error.message });
   }
};

export const getTermconditionById = async (req,res) => {
    try {
        const termcondition = await TermCondition.findById(req.params.id);  
        if(!termcondition){
            return res.status(404).json({
                message : "Term & Condition not found"
            })
        }
        res.status(200).json({ message : "Term & Condition fetched successfully", termcondition });
    } catch (error) {   
        res.status(500).json({ message: error.message });
    }       
};

export const updateTermcondition = async (req,res) => {
    try {
        const  termcondition = await TermCondition.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if(!termcondition){
            return res.status(404).json({
                message : "Term & Condition not found"
            })
        }
        res.status(200).json({ 
            message : "Term & Condition updated successfully",
            termcondition 
        });
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

export const deleteTermcondition = async (req,res) => {
     try {
          const termcondition = await TermCondition.findByIdAndDelete(req.params.id);
          if(!termcondition){
            return res.status(404).json({
                message : "Term & Condition not found"
            })
        }
        res.status(200).json({ 
            message : "Term & Condition deleted successfully", 
        });

     } catch (error) {
        res.status(500).json({message: error.message})
     }
};
