const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized access - No token provided" });
  }

  try {
    console.log("Received Token:", token); // Debugging line

    if (!token.startsWith("Bearer ")) {
      return res.status(400).json({ message: "Invalid token format" });
    }

    const actualToken = token.split(" ")[1]; // Extract token after "Bearer"
    
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message); // Debugging line
    res.status(403).json({ message: "Invalid token" });
  }
};
