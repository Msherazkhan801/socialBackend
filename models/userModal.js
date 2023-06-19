import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin:{
        type:Boolean,
        default:false,

    },
    profile_Picture : String,
    cover_Pic: String,
    livesIn: String,
    relationship: String,
    followers:[],
    following:[]
  },
  {
    timestamps: true,
  }
);


const User = mongoose.model('Users', userSchema);
export default User;
