const { Router } = require('express')
const router = Router()
const Books = require('../model/Books')
const Users = require('../model/Users')

router.get('/', async (req, res) => {
  try {
    const users = await Users.find().populate([
      'comments',
      'readBooks',
      'favouritesBooks',
      'buyBooks',
    ])
    if (users.length === 0) throw new Error('Users is empty')
    res.json(users)
  } catch (error) {
    res.send(error.message)
  }
})

router.post('/addUser', async (req, res) => {
  const { nickname, name, email, picture, phone, address } = req.body
  try {
    const isExistUser = await Users.findOne({ email })
    if (isExistUser) return res.json(isExistUser)

    let isSuperAdmin = false
    if (email === 'guillermobr88@gmail.com') isSuperAdmin = true

    const newUser = new Users({
      nickname,
      name,
      email,
      picture,
      phone,
      address,
      isSuperAdmin,
    })

    const user = await newUser.save()

    res.send(user)
  } catch (error) {
    res.status(404).send(error.message)
  }
})

router.post('/updateUser/:id', async (req, res) => {
  const { id } = req.params
  try {
    if (Object.keys(req.body).length === 0) throw new Error('Send propertys')
    const user = await Users.findByIdAndUpdate(id, req.body, { new: 1 })
    res.json(user)
  } catch (error) {
    res.send(error.message)
  }
})

router.post('/toggleAdmin/:id', async (req, res) => {
  const { id } = req.params
  try {
    const user = await Users.findById(id)
    if (!user) throw new Error('The user not exists')

    if (user.isAdmin) {
      user.isAdmin = false
      await user.save()
      return res.send('The user now is not admin')
    } else {
      user.isAdmin = true
      await user.save()
      return res.send('The user is now admin')
    }
  } catch (error) {
    res.send(error.message)
  }
})

router.post('/toggleBanned/:id', async (req, res) => {
  const { id } = req.params
  try {
    const user = await Users.findById(id)
    if (user.isBanned) {
      user.isBanned = false
      await user.save()
      return res.send('The user now is not banned')
    } else {
      user.isBanned = true
      await user.save()
      return res.send('The user is now banned')
    }
  } catch (error) {
    res.send(error.message)
  }
})

router.post('/addDesiredBooks/:idBook/:idUser', async (req, res) => {
  const { idBook, idUser } = req.params
  try {
    const book = await Books.findById(idBook)
    const user = await Users.findById(idUser)

    user.favouritesBooks.push(book._id)

    const userUpdated = await user.save()

    res.send(userUpdated)
  } catch (error) {
    res.send(error.message)
  }
})

router.post('/deleteDesiredBooks/:idBook/:idUser', async (req, res) => {
  const { idBook, idUser } = req.params
  try {
    const book = await Books.findById(idBook)
    const user = await Users.findById(idUser)

    user.favouritesBooks = user.favouritesBooks.filter(
      (b) => b._id !== book._id
    )
    await user.save()

    res.send('Book successfully deleted')
  } catch (error) {
    res.send(error.message)
  }
})

router.post('/comment/:idBook/:idUser', async (req, res) => {})

router.post('')
module.exports = router
