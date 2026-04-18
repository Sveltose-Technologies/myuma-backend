import BookNow from "../model/bookNow.model.js";

export const bookNowCreate = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    if (!userId || !itemId) {
      return res.status(400).json({
        status: false,
        message: "userId and itemId are required",
      });
    }

    // prevent duplicate booking
    const existing = await BookNow.findOne({ userId, itemId });

    if (existing) {
      return res.status(400).json({
        status: false,
        message: "Item already booked",
      });
    }

    const booking = await BookNow.create({ userId, itemId });

    res.status(201).json({
      status: true,
      message: "Item Booked Successfully",
      booking,
    });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllItems = async (req, res) => {
  try {
    const bookings = await BookNow.find().sort({ createdAt: -1 });

    if (bookings.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No booked items found",
      });
    }

    res.status(200).json({
      status: true,
      message: "All Booked Items Found Successfully",
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const itemsGetById = async (req, res) => {
  try {
    const booking = await BookNow.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        status: false,
        message: "Booked Item Not Found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Booked Item Found Successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteItems = async (req, res) => {
  try {
    const booking = await BookNow.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({
        status: false,
        message: "Booked Item Not Found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Booked Item Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateItem = async (req, res) => {
  try {
    const booking = await BookNow.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        status: false,
        message: "Booked Item Not Found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Booked Item Updated Successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};