import Footer from "../model/footer.model.js";

export const footerCreate = async (req, res) => {
  try {
    const { content, email, contactNo, address } = req.body;
    if (!content || !email || !contactNo || !address) {
      return res.status(400).json({
        message: "all fields are require",
      });
    }

    const footer = await Footer.create({ content, email, contactNo, address });
    res.status(201).json({
      message: "footer data created successfully",
      footer,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const footerGetAll = async (req, res) => {
  try {
    const footer = await Footer.find().sort({ createdAt: -1 });

    if (!footer) {
      return res.status(404).json({
        staus: false,
        message: "footer data not found",
      });
    }

    res.status(200).json({
      message: "footer data fetched successfully",
      count : footer.length,
      footer,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const footerGetById = async (req, res) => {
  try {
    const footer = await Footer.findById(req.params.id);

    if (!footer) {
      return res.status(404).json({
        staus: false,
        message: "footer data not found",
      });
    }

    res.status(200).json({
      message: "footer data fetched successfully",
      footer,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const footerUpdate = async (req, res) => {
  try {
    const footer = await Footer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!footer) {
      return res.status(404).json({
        staus: false,
        message: "footer data not found",
      });
    }

    res.status(200).json({
      message: "footers data update successfully",
      footer,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const footerDelete = async (req, res) => {
  try {
    const footer = await Footer.findByIdAndDelete(req.params.id);

    if (!footer) {
      return res.status(404).json({
        staus: false,
        message: "footer data not found",
      });
    }

    res.status(200).json({
      message: "footer data delete successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
