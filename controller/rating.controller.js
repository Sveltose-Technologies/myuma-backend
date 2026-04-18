import Rating from "../model/rating.model.js";


export const ratingSend = async (req, res) => {
  try {
    const { userId, itemId, rating, comment } = req.body;

    if (!userId || !itemId || !rating) {
      return res.status(400).json({
        status: false,
        message: "userId, itemId, rating is required",
      });
    }

    const exists = await Rating.findOne({ userId, itemId });

    if (exists) {
      return res.status(400).json({
        status: false,
        message: "You already rated this item",
      });
    }

    const newRating = await Rating.create({
      userId,
      itemId,
      rating,
      comment,
    });

    res.status(201).json({
      status: true,
      message: "Rating sent successfully",
      data: newRating,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const ratingGetAll = async (req, res) => {
  try {
    const ratings = await Rating.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: true,
      message: "Ratings fetched successfully",
      count: ratings.length,
      data: ratings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const ratingGetById = async (req, res) => {
  try {
    const rating = await Rating.findById(req.params.id);

    if (!rating) {
      return res.status(404).json({
        status: false,
        message: "Rating not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Rating fetched successfully",
      data: rating,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const ratingUpdate = async (req, res) => {
  try {
    const rating = await Rating.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!rating) {
      return res.status(404).json({
        status: false,
        message: "Rating not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Rating updated successfully",
      data: rating,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const ratingDelete = async (req, res) => {
  try {
    const rating = await Rating.findByIdAndDelete(req.params.id);

    if (!rating) {
      return res.status(404).json({
        status: false,
        message: "Rating not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Rating deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};