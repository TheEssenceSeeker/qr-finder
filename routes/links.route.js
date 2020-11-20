const router = require('express').Router()
const Link = require('../models/Link')
const auth = require('../middleware/auth.middleware')
const shortid = require('shortid')

router.post('/generate', auth, async (req, res) => {
  try {
    const link = new Link({
      owner: req.user.id,
      name: req.body.name,
      description: req.body.description,
    })

    await link.save()

    res.status(201).json({ link })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.id })
    res.json(links)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id)
    res.json(link)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/info/:id', async (req, res) => {
  try {
    const link = await Link.findById(req.params.id)
    res.json(link)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.delete('/delete', auth, async (req, res) => {
  try {
    const link = await Link.findOne({
      owner: req.user.id,
      _id: req.body.id,
    })

    await link.remove()

    res.status(200).json({ message: 'Ссылка успешно удалена' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
