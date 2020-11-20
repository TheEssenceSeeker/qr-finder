const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { validationResult, check } = require('express-validator')
const jwt = require('jsonwebtoken')

router.post(
  '/register',
  [
    check('email', 'Некорректный email')
      .isEmail()
      .custom((email) => {
        return User.findOne({ email }).then((user) => {
          if (user) {
            return Promise.reject('Пользователь с этим email-ом уже существует')
          }
        })
      }),
    check('password')
      .isLength({
        min: 6,
      })
      .withMessage('Минимальная длина пароля 6 символов')
      .custom((value, { req }) => {
        if (value !== req.body['passwordCheck']) {
          throw new Error('Пароли должны совпадать')
        }
        return true
      }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при регистрации',
        })
      }

      const { email, password } = req.body

      // hash the password
      const salt = await bcrypt.genSalt()
      const passwordHash = await bcrypt.hash(password, salt)

      const newUser = new User({
        email,
        password: passwordHash,
      })

      await newUser.save()
      res.status(201).json({ message: 'Пользователь успешно создан' })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }
)

router.post(
  '/login',
  [
    check('email', 'Некорректный email').normalizeEmail().isEmail(),
    check('password', 'Пароль не может быть пустым').exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при входе в систему',
        })
      }

      const { email, password } = req.body

      const user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({ message: 'Пользователь не найден' })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res
          .status(400)
          .json({ message: 'Некорректные данные при входе в систему' })
      }

      // creating jwt
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      })

      res.json({
        token,
        id: user.id,
      })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }
)

module.exports = router
