import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
   profileImage: {
      type: String,
    },  

    fullName: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      unique: true
    },

    password: {
      type: String,
      minlength: 6
    },

    address: {
      type: String,
    },

    role: {
      type: String,
      enum: ["user", "admin"],   
      default: "user"            
    },

    resetOtp: {
      type: String,
    },

    resetOtpExpire: {
      type: Date,
    },

    resetOtpVerified: {
      type: Boolean,
      default: false,
    },

    isVerified: {
       type: Boolean,
       default: false
    },

  },
  {
    timestamps: true,
    collection: "auth"  
  }
);

const Auth = mongoose.model("Auth", authSchema);

export default Auth;