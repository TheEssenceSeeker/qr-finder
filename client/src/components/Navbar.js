import React, { useContext, useEffect, useRef } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'
import M from 'materialize-css/dist/js/materialize.min.js'

export const Navbar = () => {
  const auth = useContext(AuthContext)
  const history = useHistory()

  const logoutHandler = e => {
    e.preventDefault()
    auth.logout()
    history.push('/')
  }

  useEffect(() => {
    const sidenav = document.querySelector('#slide-out-menu')
    console.log(sidenav)
    M.Sidenav.init(sidenav, {})
  }, [])

  return (
    <>
      <nav>
        <div className="nav-wrapper teal darken-1 px-2">
          <span className="brand-logo">QR Finder</span>
          <a href="#" data-target="slide-out-menu" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <NavLink to="/create">Создать</NavLink>
            </li>
            <li>
              <NavLink to="/links">Мои ссылки</NavLink>
            </li>
            <li>
              <a href="/" onClick={logoutHandler}>
                Выйти
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <ul className="sidenav" id="slide-out-menu">
        <li>
          <NavLink to="/create" className="sidenav-close">
            Создать
          </NavLink>
        </li>
        <li>
          <NavLink to="/links" className="sidenav-close">
            Мои ссылки
          </NavLink>
        </li>
        <li>
          <a href="/" onClick={logoutHandler} className="sidenav-close">
            Выйти
          </a>
        </li>
      </ul>
    </>
  )
}
