const { Router } = require('express')
const router = Router()
const Books = require('../model/Books')
const Order = require('../model/Order')
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
    await newUser.save()

    const user = await Users.find({ email: email }).populate([
      'comments',
      'readBooks',
      'favouritesBooks',
      'buyBooks',
    ])

    console.log(user)

    res.json([user])
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
      if (bookFav.toString() === book._id.toString()) return res.json(user)
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
        user.isS = true
        await user.save()
        return res.send('The user is now admin')
      }
    }
  } catch (error) {
    res.send(error.message)
  }
})

router.post('/toggleAdminData', async (req, res) => {
  const { id } = req.query
  const userIds = req.body
  try {
    if (userIds) {
      userIds.forEach(async (id) => {
        const user = await Users.findById(id)

        if (!user) throw new Error('The user not exists')
        if (user.isAdminData) {
          user.isAdminData = false
          await user.save()
        } else {
          user.isAdminData = true
          await user.save()
        }
      })

      res.json('Usuarios actualizados!')
    } else {
      const user = await Users.findById(id)
      if (!user) throw new Error('The user not exists')

      if (user.isAdminData) {
        user.isAdminData = false
        await user.save()
        return res.send('The user now is not admin')
      } else {
        user.isAdminData = true
        await user.save()
        return res.send('The user is now admin')
      }
    }
  } catch (error) {
    res.send(error.message)
  }
})

router.post('/toggleAdminStock', async (req, res) => {
  const { id } = req.query
  const userIds = req.body
  try {
    if (userIds) {
      userIds.forEach(async (id) => {
        const user = await Users.findById(id)

        if (!user) throw new Error('The user not exists')
        if (user.isAdminStock) {
          user.isAdminStock = false
          await user.save()
        } else {
          user.isAdminStock = true
          await user.save()
        }
      })

      res.json('Usuarios actualizados!')
    } else {
      const user = await Users.findById(id)
      if (!user) throw new Error('The user not exists')

      if (user.isAdminStock) {
        user.isAdminStock = false
        await user.save()
        return res.send('The user now is not admin')
      } else {
        user.isAdminStock = true
        await user.save()
        return res.send('The user is now admin')
      }
    }
  } catch (error) {
    res.send(error.message)
  }
})
router.post('/toggleAdminUsers', async (req, res) => {
  const { id } = req.query
  const userIds = req.body
  try {
    if (userIds) {
      userIds.forEach(async (id) => {
        const user = await Users.findById(id)

        if (!user) throw new Error('The user not exists')
        if (user.isAdminUsers) {
          user.isAdminUsers = false
          await user.save()
        } else {
          user.isAdminUsers = true
          await user.save()
        }
      })

      res.json('Usuarios actualizados!')
    } else {
      const user = await Users.findById(id)
      if (!user) throw new Error('The user not exists')

      if (user.isAdminUsers) {
        user.isAdminUsers = false
        await user.save()
        return res.send('The user now is not admin')
      } else {
        user.isAdminUsers = true
        await user.save()
        return res.send('The user is now admin')
      }
    }
  } catch (error) {
    res.send(error.message)
  }
})
router.post('/toggleAdminOrders', async (req, res) => {
  const { id } = req.query
  const userIds = req.body
  try {
    if (userIds) {
      userIds.forEach(async (id) => {
        const user = await Users.findById(id)

        if (!user) throw new Error('The user not exists')
        if (user.isAdminOrders) {
          user.isAdminOrders = false
          await user.save()
        } else {
          user.isAdminOrders = true
          await user.save()
        }
      })

      res.json('Usuarios actualizados!')
    } else {
      const user = await Users.findById(id)
      if (!user) throw new Error('The user not exists')

      if (user.isAdminOrders) {
        user.isAdminOrders = false
        await user.save()
        return res.send('The user now is not admin')
      } else {
        user.isAdminOrders = true
        await user.save()
        return res.send('The user is now admin')
      }
    }
  } catch (error) {
    res.send(error.message)
  }
})
router.post('/toggleAdminMarketing', async (req, res) => {
  const { id } = req.query
  const userIds = req.body
  try {
    if (userIds) {
      userIds.forEach(async (id) => {
        const user = await Users.findById(id)

        if (!user) throw new Error('The user not exists')
        if (user.isAdminMarketing) {
          user.isAdminMarketing = false
          await user.save()
        } else {
          user.isAdminMarketing = true
          await user.save()
        }
      })

      res.json('Usuarios actualizados!')
    } else {
      const user = await Users.findById(id)
      if (!user) throw new Error('The user not exists')

      if (user.isAdminMarketing) {
        user.isAdminMarketing = false
        await user.save()
        return res.send('The user now is not admin')
      } else {
        user.isAdminMarketing = true
        await user.save()
        return res.send('The user is now admin')
      }
    }
  } catch (error) {
    res.send(error.message)
  }
})

router.post('/hideUser/:id', async (req, res) => {
  const { id } = req.params
  try {
    const user = await Users.findById(id)
    if (!user) throw new Error('El usuario no existe')

    if (user.buyBooks.length > 0) {
      user.buyBooks.forEach(async (idBook) => {
        const order = await Order.findById(idBook)
        order.isHidden = true
        await order.save()
      })
    }

    user.isHidden = true
    user.save()

    if (user.isHidden) return res.send('Usuario ocultado')
  } catch (error) {
    res.send(error.message)
  }
})

router.post('/showUser/:id', async (req, res) => {
  const { id } = req.params
  try {
    const user = await Users.findById(id)
    if (!user) throw new Error('El usuario no existe')

    if (user.buyBooks.length > 0) {
      user.buyBooks.forEach(async (idOrder) => {
        const order = await Order.findById(idOrder)
        order.isHidden = false
        await order.save()
      })
    }

    user.isHidden = false
    user.save()

    if (!user.isHidden) return res.send('Usuario desocultado')
  } catch (error) {
    res.send(error.message)
  }
})

router.delete('/deleteUser/:id', async (req, res) => {
  const { id } = req.params
  try {
    const user = await Users.findById(id)
    if (!user) throw new Error('Usuario no encontrado')
    if (user.buyBooks.length > 0) {
      user.buyBooks.forEach(async (idOrder) => {
        await Order.findByIdAndDelete(idOrder)
      })
    }
    await Users.findByIdAndDelete(id)
    res.send('Usuario eliminado correctamente')
  } catch (error) {
    res.status(404).send(error.message)
  }
})

module.exports = router
