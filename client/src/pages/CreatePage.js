import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/auth.context'
import { useHistory } from 'react-router-dom'

export const CreatePage = () => {
  const history = useHistory()
  const { request } = useHttp()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const auth = useContext(AuthContext)

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const submitHandler = async () => {
    try {
      const data = await request(
        '/api/links/generate',
        'POST',
        { description, name },
        { Authorization: `Bearer ${auth.token}` }
      )
      history.push(`/details/${data.link._id}`)
    } catch (e) {}
  }

  return (
    <div className="row">
      <div className="col s12 offset-s0 m8 offset-m2 mt-2">
        <div className="input-field">
          <input
            id="name"
            type="text"
            autoComplete="off"
            onChange={e => setName(e.target.value)}
            value={name}
            placeholder="Введите название ссылки"
          />
          <label htmlFor="name">Название</label>
        </div>
        <div className="input-field">
          <textarea
            className="materialize-textarea"
            id="description"
            type="text"
            autoComplete="off"
            onChange={e => setDescription(e.target.value)}
            value={description}
            placeholder="Введите информацию"
          />
          <label htmlFor="description">Описание</label>
        </div>
        <div className="center">
          <button
            onClick={submitHandler}
            className="btn teal waves-effect darken-1 white-text"
          >
            Создать ссылку и QR-код
          </button>
        </div>
      </div>
    </div>
  )
}
