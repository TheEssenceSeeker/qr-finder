import React from 'react'
import QRCode from 'qrcode.react'

export const LinkCard = ({ link }) => {
  const url = `http://localhost:3000/info/${link._id}`

  return (
    <div className="row mt-3">
      <div className="col s12 m8 link-details no-overflow-x">
        <h2 className="mt-0">Ссылка</h2>
        <p>Название: {link.name}</p>
        <p>Описание: {link.description}</p>
        <p>
          Ссылка: <a href={url}>{url}</a>
        </p>
      </div>
      <div className="col s12 m4 qr-container">
        <QRCode value={url} />
      </div>
    </div>
  )
}
