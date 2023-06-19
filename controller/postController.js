import express from 'express';
import UserPost from '../models/postModal.js';
import User from '../models/userModal.js'
import mongoose from 'mongoose';
const app = express();

export const createPost = async (req, res) => {
  const newPost = await UserPost(req.body);
  try {
    await newPost.save();
    res.status(200).json('Post Created');
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const newPost = await UserPost.findById(id);
    if (newPost) {
      res.status(200).json(newPost);
    } else {
      res.status(401).json('something went wrong');
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;
 try{
  const post = await UserPost.findById(postId)
  if (post.userId===userId){
    await UserPost.updateOne({$set :req.body})
    res.status(200).json('post updated')
  }else{
    res.status(401).json('action frobidn')

  }
}catch(error){
    res.status(500).json(error)
  }
};
export const deletePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
 try{
  const post = await UserPost.findById(id)
  if (post.userId===userId){
  await post.deleteOne()
  res.status(200).json(' post deleted')

  }else{
    res.status(401).json('action frobidn')

  }
}catch(error){
    res.status(500).json(error)
  }
};
export const likePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
 try{
  const post = await UserPost.findById(id)
  if (!post.likes.includes(userId)){
  await post.updateOne({$push: {likes:userId}})
  res.status(200).json(' post like by you')

  }else{
    res.status(401).json('action frobidn')

  }
}catch(error){
    res.status(500).json(error)
  }
};
export const disLikePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
 try{
  const post = await UserPost.findById(id)
  if (post.likes.includes(userId)){
  await post.updateOne({$pull: {likes:userId}})
  res.status(200).json(' post like by you')

  }else{
    res.status(401).json('action frobidn')

  }
}catch(error){
    res.status(500).json(error)
  }
};

// Get Timeline POsts
export const getTimeline = async (req, res) => {
    const userId = req.params.id;
  
    try {
      const currentUserPosts = await UserPost.find({ userId: userId });
      const followingPosts = await User.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(userId),
          },
        },
        {
          $lookup: {
            from: "Posts",
            localField: "following",
            foreignField: "userId",
            as: "followingPosts",
          },
        },
        {
          $project: {
            followingPosts: 1,
            _id: 0,
          },
        },
      ]);
  
      res
        .status(200)
        .json(currentUserPosts.concat(...followingPosts[0].followingPosts)
        .sort((a,b)=>{
            return b.createdAt - a.createdAt;
        })
        );
    } catch (error) {
      res.status(500).json(error);
    }
  };