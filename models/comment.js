const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  body: {
    type: String,
  },
  userName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

module.exports = mongoose.model("Comment", commentSchema);
