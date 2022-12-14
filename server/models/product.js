import mongoose from "../db/connect";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  details: {
    type: String,
  },

  highlights: [
    {
      type: String,
    },
  ],
  price: { type: Number },
  images: [
    {
      type: Object,
      required: false,
    },
  ],
  colors: [
    {
      type: Object,
      required: false,
    },
  ],
  sizes: [
    {
      type: Object,
      required: false,
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  editedAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;
