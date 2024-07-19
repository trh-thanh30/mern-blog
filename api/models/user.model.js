import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      requied: true,
      unique: true,
    },
    email: {
      type: String,
      requied: true,
      unique: true,
    },
    password: {
      type: String,
      requied: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg",
    },
  },
  { timestamps: true }
);
const User = mongoose.models?.User || mongoose.model("User", userSchema);
export default User;
