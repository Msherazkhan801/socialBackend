import User from '../models/userModal.js';
import bcrypt from 'bcryptjs';
export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (user) {
      const { password, ...otherDetails } = user._doc;
      res.status(200).json(otherDetails);
    } else {
      res.status(401).json('user does not existed');
    }
  } catch (error) {
    res.status(500).json({ massage: error.massage });
  }
};
export const getUserUpdate = async (req, res) => {
  const id = req.params.id;
  const { currentUseId, currentUserStatusAdmin, password } = req.body;
  if (id === currentUseId || currentUserStatusAdmin) {
    try {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }

      const user = await User.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ massage: error.massage });
    }
  } else {
    res.status(500).json('only authentic user will update');
  }
};
export const getUserDelete = async (req, res) => {
  const id = req.params.id;
  const { currentUseId, currentUserStatusAdmin, password } = req.body;
  if (id === currentUseId || currentUserStatusAdmin) {
    try {
      const user = await User.findByIdAndDelete(id);
      res.status(200).json('successfully user deleted');
    } catch (error) {
      res.status(500).json({ massage: error.massage });
    }
  } else {
    res.status(500).json('only authentic user will delete');
  }
};

export const followers = async(req, res) => {
  const id = req.params.id;
  const {currentUserId}=req.body;
  if(currentUserId===id){
    res.status(403).json('action frobidn')
  }else{
try{

    const followeUser=await User.findById(id)
    const followingUser=await User.findById(currentUserId)
    if(!followeUser.followers.includes(currentUserId)){
        await followeUser.updateOne({$push:{followers:currentUserId}})
        await followingUser.updateOne({$push:{following:id}})
        res.status(200).json('user follwing successfully')
    }
    else{
        res.status(401).json('user already follow by you')
        
    }
}catch(error){
    res.status(500).json(error)
    
}
  }
};
export const unFollow = async(req, res) => {
  const id = req.params.id;
  const {currentUserId}=req.body;
  if(currentUserId===id){
    res.status(403).json('action frobidn')
  }else{
try{

    const followeUser=await User.findById(id)
    const followingUser=await User.findById(currentUserId)
    if(followeUser.followers.includes(currentUserId)){
        await followeUser.updateOne({$pull:{followers:currentUserId}})
        await followingUser.updateOne({$pull:{following:id}})
        res.status(200).json('user unfollwing successfully')
    }
    else{
        res.status(401).json('follow first')
        
    }
}catch(error){
    res.status(500).json(error)

}
  }
};
