module.exports = (req, res, next) => {
  const apiKey = req.header("X-API-Key");
  if (apiKey === process.env.ADMIN_API_KEY) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};
