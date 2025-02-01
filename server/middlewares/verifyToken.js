const jwt = require("jsonwebtoken");
require("dotenv").config();

const { ACCESS_TOKEN_SECRET } = process.env; // Retrieve the secret for verifying tokens

//  function to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.cookies["token"];  // Get the token from cookies
  if (!token) {
    res.status(401).json({ message: "unauthorized" });
    return;
  }
  // Verify the token using the secret
  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decode) => {
    if (err) {
      res.status(403).json({ message: "forbidden", error: err.message });
      return;
    }

    console.log(decode);
    
    req.user = decode;

    next();
  });
};

module.exports = {
  verifyToken,
};
