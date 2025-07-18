// Add address - POST /api/address/add
import Address from "../models/address.js";

export const addAddress = async (req, res) => {
  try {
    const { address } = req.body;
    const userId = req.user.id; 
    await Address.create({ ...address, userId });

    res.json({
      success: true,
      message: "Address added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get address - POST /api/address/get
// Get address - GET /api/address/get
export const getAddress = async (req, res) => {
  try {
    const userId = req.user.id; 

    const addresses = await Address.find({ userId });

    res.json({
      success: true,
      addresses
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message }); 
  }
};

