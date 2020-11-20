import React, { useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/auth.context'

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const { loading, error, request, clearError } = useHttp()

  const [register, setRegister] = useState(false)
  const [form, setForm] = useState({
    email: '',
    password: '',
    passwordCheck: '',
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const toggleForm = e => {
    // e.preventDefault()
    setRegister(prev => !prev)
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {
        ...form,
      })
      message(data.message)
      setForm(prev => ({
        email: prev.email,
        password: '',
        passwordCheck: '',
      }))
      setRegister(false)
    } catch (e) {}
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {
        ...form,
      })
      auth.login(data.token, data.id)
    } catch (e) {}
  }

  return (
    <div className="row">
      <div className="col s12 m8 offset-m2 l6 offset-l3">
        <h2>QR Finder</h2>
        <div className="card teal darken-1">
          <div className="card-content white-text">
            <span className="card-title">
              {register ? 'Регистрация' : 'Авторизация'}
            </span>
            <div>
              <div className="input-field green-input">
                <input
                  className="white-text"
                  // placeholder="Введите email"
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="off"
                  onChange={changeHandler}
                  value={form.email}
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field green-input">
                <input
                  className="white-text"
                  // placeholder="Введите пароль"
                  id="password"
                  type="password"
                  name="password"
                  onChange={changeHandler}
                  value={form.password}
                />
                <label htmlFor="password">Пароль</label>
              </div>

              {register && (
                <div className="input-field green-input">
                  <input
                    className="white-text "
                    // placeholder="Введите пароль еще раз"
                    id="passwordCheck"
                    type="password"
                    name="passwordCheck"
                    onChange={changeHandler}
                    value={form.passwordCheck}
                  />
                  <label htmlFor="passwordCheck">Подтверждение пароля</label>
                </div>
              )}
            </div>
          </div>
          <div className="card-action center-align">
            <button
              onClick={register ? registerHandler : loginHandler}
              className="btn teal waves-effect accent-3 black-text mr-1"
              disabled={loading}
            >
              {register ? 'Зарегистрироваться' : 'Логин'}
            </button>
            <button
              className="waves-effect waves-teal white-text btn-flat"
              onClick={toggleForm}
              disabled={loading}
            >
              {register ? 'Вход в систему' : 'Регистрация'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
