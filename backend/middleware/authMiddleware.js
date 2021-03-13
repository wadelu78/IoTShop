'use strict'

import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
  const authInfo = req.headers.authorization

  if (authInfo && authInfo.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      //req.user = await User.findById(decoded.id).select('-password')
      req.decodedId = decoded.id

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token verification failed')
    }
  } else {
    res.status(401)
    throw new Error('Not authorized, no token found')
  }
})

const admin = asyncHandler(async (req, res, next) => {
  if (req.decodedId) {
    const { isAdmin } = await User.findById(req.decodedId)
    if (isAdmin) {
      next()
    } else {
      throw new Error('Not authorized, the user is not admin')
    }
  } else {
    res.status(401)
    throw new Error('Not authorized, no token found')
  }
})

export { protect, admin }
