const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.model("User", UserSchema);

module.exports = async (req, res) => {
  try {
    const user = new userModel({
      username: req.body.username,
      password: req.body.password,
    });

    await user.save();

    res.json({
      message: `Successfully saved ${user.username}`,
    });
  } catch (e) {
    res.status(400).json({
      error: `Error: ${e.message}`,
    });
  }
};
