import React, { useCallback, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useParams } from 'react-router-dom'
import { Loader } from '../components/Loader'

export const InfoPage = () => {
  const { request, loading } = useHttp()
  const linkId = useParams().id
  const [link, setLink] = useState(null)

  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/links/info/${linkId}`)
      setLink(fetched)
    } catch (e) {}
  }, [linkId, request])

  useEffect(() => {
    getLink()
  }, [getLink])

  if (loading) return <Loader />

  return (
    <>
      {!loading && link && (
        <div className="row">
          <div className="col s12 m8 offset-m2 l6 offset-l3">
            <h2>QR Finder</h2>
            <div className="card teal darken-1">
              <div className="card-content white-text">
                <span className="card-title">Информация</span>
                <div className="no-overflow-x">
                  <h6>{link.name}</h6>
                  <br />
                  <p>{link.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
