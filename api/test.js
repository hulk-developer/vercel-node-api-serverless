module.exports = (req, res) => {
  console.log(req.headers);
  res.send("<h1> This is a vercel test</h1>");
};
