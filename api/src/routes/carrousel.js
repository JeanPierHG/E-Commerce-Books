const { Router } = require('express')

const router = Router()
const Carrousel = require('../model/Carrousel')

router.get('/', async (req, res) => {
    try{
      const imagenes = await Carrousel.find({})
      res.send(imagenes)
    } catch (error){
      res.send(error.message)
    }
})

router.post('/addCarrousel', async (req, res) => {
  const { image } = req.body

  try{
    const newImage = new Carrousel({
      image,
    })
    await newImage.save()
    const savedImage = await Carrousel.find({})
    res.send(savedImage)
  } catch(error){
    res.status(404).send(error)
  }
})

router.post('/updateImage/:id', async (req, res) => {
  const { id } = req.params
  const image = req.body

  try {
    const imageUpdate = await Carrousel.findByIdAndUpdate({_id: id }, image)
    res.send(imageUpdate)
  } catch (error) {
    res.status(404).send(error)
  }
})

router.delete('/deleteCarrousel/:id', async (req,res) =>{
  const { id } = req.params
  try{
    await Carrousel.findByIdAndDelete(id)
    res.send()
  }catch (error){
    res.status(404).send(error)
  }

})

module.exports = router