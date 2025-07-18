import jwt from 'jsonwebtoken';

const authSeller = async (req, res, next) => {
  const { sellerToken } = req.cookies;

  if (!sellerToken) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized",
    });
  }

  try {
    const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET);

    if (tokenDecode.email === process.env.SELLER_EMAIL) {
      next(); // Proceed to controller
    } else {
      return res.status(401).json({
        success: false,
        message: "Not Authorized",
      });
    }

  } catch (error) {
    console.error("Token Verification Error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default authSeller;
