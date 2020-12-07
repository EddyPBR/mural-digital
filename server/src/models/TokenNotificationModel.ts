import { Schema, Document, model } from "mongoose";

interface TokenNotification extends Document {
  token: string;
}

const TokenNotificationSchema = new Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export default model<TokenNotification>(
  "TokenNotification",
  TokenNotificationSchema
);
