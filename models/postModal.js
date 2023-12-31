import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
  {
    userId: { type: String,  required:true},
    des: String,
    likes: [],
    image: String,
  },
  {
    timestamps: true,
  }
);
const UserPost = mongoose.model('Posts', postSchema);
export default UserPost;
