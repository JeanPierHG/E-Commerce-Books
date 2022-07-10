const { Router } = require('express')

const router = Router()
const Comments = require('../model/Comments')
const Users = require('../model/Users')
const Books = require('../model/Books')

router.get('/', async (req, res) => {
  try {
    const allComments = await Comments.find({})
      .populate('users')
      .populate('books')
    res.send(allComments)
  } catch (error) {
    res.send(error.message)
  }
})

router.post('/addComment', async (req, res) => {
  const { comment, nickname, title } = req.body
  const user = await Users.findOne({ nickname: nickname })
  const book = await Books.findOne({ title: title })

  try {
    const newComment = new Comments({
      users: user._id,
      books: book._id,
      comment,
    })
    await newComment.save()
    user.comments = user.comments.concat(newComment._id)
    await user.save()
    book.comments = book.comments.concat(newComment._id)
    await book.save()
    const savedComment = await Comments.find({ _id: newComment._id })
      .populate('users')
      .populate('books')
    res.send(savedComment)
  } catch (error) {
    res.status(404).send(error)
  }
})

router.post('/updateComment/:id', async (req, res) => {
  const { id } = req.params
  const comment = req.body

  try {
    await Comments.findByIdAndUpdate(id, comment).then(() => {
      Comments.findOne({ _id: id })
        .populate('users')
        .populate('books')
        .then((book) => {
          res.send(book)
        })
    })
  } catch (error) {
    res.status(404).send(error)
  }
})

router.delete('/deleteComment/:id', async (req, res) => {
  const { id } = req.params
  try {
    await Comments.findByIdAndDelete(id)
    res.send('Comentario borrado')
  } catch (error) {
    res.status(404).send(error)
  }
})

router.post('/toggleComment', async (req, res) => {
  const commentIds = req.body
  try {
    if (commentIds) {
      commentIds.forEach(async (id) => {
        const comment = await Comments.findById(id)

        if (!comment) throw new Error('The comment not exists')
        if (comment.isHidden) {
          comment.isHidden = false
          await comment.save()
        } else {
          comment.isHidden = true
          await comment.save()
        }
      })

      res.json('Usuarios actualizados!')
    } else {
      const comment = await Comments.findById(id)
      if (!comment) throw new Error('The comment not exists')

      if (comment.isHidden) {
        comment.isHidden = false
        await comment.save()
        return res.send('The comment now is not admin')
      } else {
        comment.isHidden = true
        await comment.save()
        return res.send('The comment is now admin')
      }
    }
  } catch (error) {
    res.send(error.message)
  }
})

router.delete('/adminDeleteComments', async (req, res) => {
  const commentIds = req.body
  try {
    if (commentIds) {
      commentIds.forEach(async (id) => {
        await Comments.findByIdAndDelete(id).populate(['users, books'])
      })
    }
    return res.json('Usuarios actualizados!')
  } catch (error) {
    res.send(error.message)
  }
})

module.exports = router
