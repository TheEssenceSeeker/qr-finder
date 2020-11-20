import React from 'react'
import { Link } from 'react-router-dom'

export const LinksList = ({ links, deleteLink }) => {
  if (!links.length) {
    return <p className="center">Вы пока не создали ни одной ссылки</p>
  }

  const deleteHandler = (e, link) => {
    e.preventDefault()
    deleteLink(link._id)
  }

  return (
    <table className="highlight mt-2 centered">
      <thead>
        <tr>
          <th>№</th>
          <th>Название</th>
          <th>Детали</th>
          <th>Удалить</th>
        </tr>
      </thead>

      <tbody>
        {links.map((link, i) => (
          <tr key={link._id}>
            <td>{i + 1}</td>
            <td>{link.name.substring(0, 15)}</td>
            <td>
              <Link to={`/details/${link._id}`}>Открыть</Link>
            </td>
            <td>
              <button
                className="waves-effect btn-small waves-light btn red lighten-1 squared-btn"
                onClick={e => deleteHandler(e, link)}
              >
                <i className="material-icons">delete_forever</i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
