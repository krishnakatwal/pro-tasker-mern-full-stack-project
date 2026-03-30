import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must use a valid email address"],
  },
});

//Hash password before saving
userSchema.pre("save", async function () {
  //"this" refers to document we are trying save to the database || Checks if the password field was changed
  if (this.isNew || this.isModified("password")) {
    //10 rounds → lock it 10 times (much harder to break)
    const saltRounds = 10;
    //store the hashed password value into the password field
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
