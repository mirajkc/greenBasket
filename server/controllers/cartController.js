import User from "../models/User.js"; 
export const updateCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { cartItems } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authorized"
      });
    }

    await User.findByIdAndUpdate(userId, { cartItems });

    res.json({
      success: true,
      message: "Cart updated",
    });
  } catch (error) {
    console.error("Update cart error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};