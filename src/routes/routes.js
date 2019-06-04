const express = require('express')
const router = express.Router()
// const {register} = require('../controllers/UserController')
// const {UserValidator} = require('../validators/validators')

// router.post('/register', UserValidator, register)

// router.post('/login', requiresLogout, login)

const { register, login, logout } = require('../controllers/UserController')

function requiresLogin(req, res, next) {
  if (req.session && req.session.user) {
    return next()
  } else {
    return res.json({err: 'You must be logged in to view this page.'})
  }
}

function requiresLogout(req, res, next) {
  if (req.session && req.session.user) {
    return res.json({ err: 'You must be logout in to Login continue' })
  } else {
    return next()
  }
}

const { listPost, detailPost, createPost, editPost, deletePost } = require('../controllers/PostControllers')
const { PostValidator, UserValidator } = require('../validators/validators')

router.get('/', (req, res) => {
  res.render('home')
})
router.get('/posts', requiresLogin, listPost)
router.get('/post/:id', requiresLogin, detailPost)
router.post('/post/new', requiresLogin, PostValidator, createPost)
router.put('/post/:id/edit', requiresLogin, PostValidator, editPost)
router.delete('/post/:id', requiresLogin, deletePost)

module.exports = router
