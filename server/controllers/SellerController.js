import jwt from 'jsonwebtoken';

// POST /api/seller/login
export const sellerLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (email === process.env.SELLER_EMAIL && password === process.env.SELLER_PASSWORD) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });

      res.cookie("sellerToken", token, {
        httpOnly: true,
        secure: "true",
        sameSite:"none",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return res.status(200).json({
        success: true,
        message: "Seller Logged In",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Invalid seller credentials",
      });
    }
  } catch (error) {
    console.error("Seller login error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/seller/is-auth
export const isSellerAuth = async (req, res) => {
  try {
    return res.json({
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/seller/logout
export const sellerLogout = async (req, res) => {
  try {
    res.clearCookie("sellerToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.json({
      success: true,
      message: "Logged Out",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
