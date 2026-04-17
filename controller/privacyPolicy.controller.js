import PrivacyPolicy from "../model/privacyPolicy.model.js";

export const createPrivacyPolicy = async(req,res) => {
    try {
        
        const {webLink, email, content} = req.body;
        const privacyPolicy = await PrivacyPolicy.create({
            webLink,
            email,  
            content
        })
        res.status(201).json({
            message : "Privacy Policy created successfully",
            privacyPolicy
        })  

        res.status(201).json({
            message : "Privacy Policy created successfully",
            privacyPolicy
        })    

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllPrivacyPolicy = async(req,res) => {
    try {
        const  privacyPolicy = await PrivacyPolicy.find().sort({ createdAt: -1 });
        if(!privacyPolicy){
            return res.status(404).json({
                message : "Privacy Policy not found"
            })
        }
        res.status(200).json({
            message : "Privacy Policy fetched successfully",
            count : privacyPolicy.length,
            privacyPolicy
        })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPrivacyPolicyById = async(req,res) => {
   try {
       const privacyPolicy = await PrivacyPolicy.findById(req.params.id);
       if(!privacyPolicy){
        return res.status(404).json({
            message : "Privacy Policy not found"
        })
       }

         res.status(200).json({ 
            message : "Privacy Policy fetched successfully",
            privacyPolicy
         });    

   } catch (error) {
      res.status(500).json({message: error.message})
   }   

};
 
export const updatePrivacyPolicy = async(req,res) => {
    try {
        const privacyPolicy = await PrivacyPolicy.findByIdAndUpdate(
            req.params.id,
            req.body, 
            {new : true}
        )
        if(!privacyPolicy) {
            return res.status(404).json({
                message : "Privacy Policy not found"
            })
        }
        res.status(200).json({
            message : 'Privacy Policy Update Successfully',
            privacyPolicy
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deletePrivacyPolicy = async(req,res) => {
    try {
        const privacyPolicy = await PrivacyPolicy.findByIdAndDelete(req.params.id);
        if(!privacyPolicy){
            return res.status(404).json({
                message : "Privacy Policy not found"
            })
        }
        res.status(200).json({
            message : 'Privacy Policy deleted successfully'
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};