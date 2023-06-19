import express from'express'
import {registerUser,loginUser } from'../controller/UserController.js'
const router =express.Router()


router.post('/login',loginUser)
router.post('/register',registerUser)
// router.post('/logout',logOutUser)
// router.get('/profile',getUserProfile)

export default router
