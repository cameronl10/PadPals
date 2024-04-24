import express from 'express'
const router = express.Router()

// // middleware that is specific to this router
// const timeLog = (req, res, next) => {
//   console.log('Time: ', Date.now())
//   next()
// }
// router.use(timeLog)

// define the home page route
router.get('/', (req, res) => {
  res.send('auth home page')
})
// define the about route
router.get('/login', (req, res) => {
  res.send('login')
})

export default router;