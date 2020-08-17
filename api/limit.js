const { chain } = require("@amaurymartiny/now-middleware");

const cors = require("cors");

const rateLimit = require("express-rate-limit");
const MongoStore = require("rate-limit-mongo");

const timeLimit = 60 * 60 * 1000;

const limiter = rateLimit({
  store: new MongoStore({
    uri: process.env.MONGODB_URI,
    collectionName: "vercel-serverless-rate-limit",
    expireTimeMs: timeLimit,
  }),
  keyGenerator: function (req) {
    return req.headers["x-real-ip"];
  },
  windowMs: timeLimit,
  max: 8,
  message: {
    error:
      "Bot activity detected. Your IP will be blocked in the next 12 hours. If you are a human, write an email to our support",
  },
});

const handler = async (req, res) => {
  res.json({
    message: "Hi There.",
  });
};

module.exports = chain(cors(), limiter)(handler);
