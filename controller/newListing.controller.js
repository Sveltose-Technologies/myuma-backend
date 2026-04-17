import newListing from "../model/newListing.model.js";

export const createListing = async (req, res) => {
  try {
    
    const images = req.files
      ? req.files.map(file => `/uploads/${file.filename}`)
      : [];


    const items = req.body.items ? JSON.parse(req.body.items) : [];

    const listing = await newListing.create({
      ...req.body,
      images,
      items
    });

    res.status(201).json({
      message: "Listing created successfully",
      listing,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllListings = async (req, res) => {
  try {
    const listings = await newListing
      .find()
      .populate("categoryId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: listings.length,
      listings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getListingById = async (req, res) => {
  try {
    const listing = await newListing
      .findById(req.params.id)
      .populate("categoryId");

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.status(200).json({ listing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateListing = async (req, res) => {
  try {
    
    const existing = await newListing.findById(req.params.id);

    if (!existing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    let images = existing.images;

    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => `/uploads/${file.filename}`);
      images = newImages;
    }

    let items = existing.items;
    if (req.body.items) {
      items = JSON.parse(req.body.items);
    }

    const updated = await newListing.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        images,
        items
      },
      { new: true }
    );

    res.status(200).json({
      message: "Listing updated successfully",
      updated,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteListing = async (req, res) => {
  try {
      const listing = await newListing.findByIdAndDelete(req.params.id);
       
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.status(200).json({ message : "Listing Delete successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};