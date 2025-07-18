import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized",
    });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: tokenDecode.id };
    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export default authUser;
