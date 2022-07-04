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

router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const userId = await Users.findById(id).populate([
      'readBooks',
      'favouritesBooks',
      'buyBooks',
      'ratingBooks',
    ])
    if (userId) throw new Error('User not found')
    res.json(userId)
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

router.post('/toggleAdmin', async (req, res) => {
  const { id } = req.query
  const userIds = req.body
  try {
    if (userIds) {
      userIds.forEach(async (id) => {
        const user = await Users.findById(id)

        if (!user) throw new Error('The user not exists')
        if (user.isAdmin) {
          user.isAdmin = false
          await user.save()
        } else {
          user.isAdmin = true
          await user.save()
        }
      })

      res.json('Usuarios actualizados!')
    } else {
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
    }
  } catch (error) {
    res.send(error.message)
  }
})

router.post('/toggleBanned', async (req, res) => {
  const { id } = req.query
  const userIds = req.body
  try {
    if (userIds) {
      userIds.forEach(async (id) => {
        const user = await Users.findById(id)

        if (!user) throw new Error('The user not exists')
        if (user.isBanned) {
          user.isBanned = false
          await user.save()
        } else {
          user.isBanned = true
          await user.save()
        }
      })

      res.json('Usuarios actualizados!')
    } else {
      const user = await Users.findById(id)
      if (!user) throw new Error('The user not exists')

      if (user.isBanned) {
        user.isBanned = false
        await user.save()
        return res.send('The user now is not admin')
      } else {
        user.isBanned = true
        await user.save()
        return res.send('The user is now admin')
      }
    }
  } catch (error) {
    res.send(error.message)
  }
})

router.post('/togglePremium', async (req, res) => {
  const { id } = req.query
  const userIds = req.body
  try {
    if (userIds) {
      userIds.forEach(async (id) => {
        const user = await Users.findById(id)

        if (!user) throw new Error('The user not exists')
        if (user.isPremiun) {
          user.isPremiun = false
          await user.save()
        } else {
          user.isPremiun = true
          await user.save()
        }
      })

      res.json('Usuarios actualizados!')
    } else {
      const user = await Users.findById(id)
      if (!user) throw new Error('The user not exists')

      if (user.isPremiun) {
        user.isPremiun = false
        await user.save()
        return res.send('The user now is not admin')
      } else {
        user.isPremiun = true
        await user.save()
        return res.send('The user is now admin')
      }
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

    const userBooksFavourites = user.favouritesBooks
    userBooksFavourites.forEach((bookFav) => {
      if (bookFav.toString() === book._id.toString())
        throw new Error('El libro ya ha sido añadido anteriormente')
    })

    user.favouritesBooks.push(book._id)

    const userUpdated = await user.save()

    res.json(userUpdated)
  } catch (error) {
    res.send(error.message)
  }
})

router.post('/deleteDesiredBooks/:idBook/:idUser', async (req, res) => {
  const { idBook, idUser } = req.params
  try {
    if (!idBook || !idUser) throw new Error('Please insert complete data')
    const book = await Books.findById(idBook)
    const user = await Users.findById(idUser)

    user.favouritesBooks = user.favouritesBooks.filter((b) => {
      return b._id.toString() !== book._id.toString()
    })

    const userUpdate = await user.save()

    res.send(userUpdate)
  } catch (error) {
    res.send(error.message)
  }
})

router.post('/toggleNewsletter', async (req, res) => {
  const userIds = req.body
  try {
    if (userIds) {
      userIds.forEach(async (id) => {
        const user = await Users.findById(id)

        if (!user) throw new Error('The user not exists')
        if (user.isSubscribeNewsLetter) {
          user.isSubscribeNewsLetter = false
          await user.save()
        } else {
          user.isSubscribeNewsLetter = true
          await user.save()
        }
      })

      res.json('Usuarios actualizados!')
    } else {
      const user = await Users.findById(id)
      if (!user) throw new Error('The user not exists')

      if (user.isSubscribeNewsLetter) {
        user.isSubscribeNewsLetter = false
        await user.save()
        return res.send('The user now is not subscribe a newsletter')
      } else {
        user.isSubscribeNewsLetter = true
        await user.save()
        return res.send('The user is now subscribe a newsletter')
      }
    }
  } catch (error) {
    res.send(error.message)
  }
})

router.post('/toggleSuperAdmin', async (req, res) => {
  const { id } = req.query
  const userIds = req.body
  try {
    if (userIds) {
      userIds.forEach(async (id) => {
        const user = await Users.findById(id)

        if (!user) throw new Error('The user not exists')
        if (user.isSuperAdmin) {
          user.isSuperAdmin = false
          await user.save()
        } else {
          user.isSuperAdmin = true
          await user.save()
        }
      })

      res.json('Usuarios actualizados!')
    } else {
      const user = await Users.findById(id)
      if (!user) throw new Error('The user not exists')

      if (user.isSuperAdmin) {
        user.isSuperAdmin = false
        await user.save()
        return res.send('The user now is not admin')
      } else {
        user.isPremiun = true
        await user.save()
        return res.send('The user is now admin')
      }
    }
  } catch (error) {
    res.send(error.message)
  }
})

module.exports = router
