import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email",
    ],
  },
  password: {
    type: String,
  },
  phone: {
    type: String,
  },
  bio: {
    type: String,
  }
}, {
  timestamps: true,
  collection: 'users' // Explicitly specify collection name
});

export default mongoose.models.User || mongoose.model("User", UserSchema);

