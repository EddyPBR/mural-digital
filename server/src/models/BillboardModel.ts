import { Schema, Document, model } from "mongoose";

interface Billboard extends Document {
  title: string;
  extendedTitle: string;
  imageUrl: string;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const BillboardSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  extendedTitle: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export default model<Billboard>("Billboard", BillboardSchema);
