import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  isbn: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
  },
  published: {
    type: Date,
    required: true,
  },
});

export default bookSchema;
