const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    date: {
      type: String,
    },
    type: {
      type: String,
    },
    done: {
      type: Boolean,
    },
    deadline: {
      type: Date,
    },
    desc: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
