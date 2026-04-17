import Pricing from "../model/pricing.model.js";

export const createPricing = async (req, res) => {
  try {
    const data = await Pricing.create(req.body);

    res.status(201).json({
      success: true,
      message: "Pricing Plan Created Successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllPricing = async (req, res) => {
  try {
    const data = await Pricing.find().sort({ createdAt: -1 });

    if(!data){
      return res.status(404).json({
        status:false,
        message : "Pricing Plans not found"
      })
    }

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getSinglePricing = async (req, res) => {
  try {
    const data = await Pricing.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Pricing Plan not found",
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const updatePricing = async (req, res) => {
  try {
    const data = await Pricing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } 
    );

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Pricing Plan Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Pricing Plan Updated Successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deletePricing = async (req, res) => {
  try {
    const data = await Pricing.findByIdAndDelete(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Pricing Plan Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Pricing Plan Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};