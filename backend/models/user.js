const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name can not be empty"],
  },
  userName: {
    type: String,
    required: [true, "userName can not be empty"],
  },
  email: {
    type: String,
    required: [true, "email can not be empty"],
  },
  password: {
    type: String,
    required: [true, "password can not be empty"],
    min: 3,
    max: 8,
  },
  website: {
    type: String,
    required: [true, "website can not be empty"],
  },
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.comparePassword = async function (password) {
  const isPasswordMatch = await bcrypt.compare(password, this.password);
  return isPasswordMatch;
};

module.exports = mongoose.model("User", UserSchema);
