import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/auth.context'
import { Loader } from '../components/Loader'
import { LinksList } from '../components/LinksList'
import { useHistory } from 'react-router-dom'

export const LinksPage = () => {
  const [links, setLinks] = useState([])
  const { loading, request } = useHttp()
  const { token } = useContext(AuthContext)
  const history = useHistory()

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request('/api/links', 'GET', null, {
        Authorization: `Bearer ${token}`,
      })
      setLinks(fetched)
    } catch (e) {}
  }, [token, request])

  const deleteHandler = async id => {
    try {
      const data = await request(
        `/api/links/delete`,
        'DELETE',
        { id: id },
        {
          Authorization: `Bearer ${token}`,
        }
      )
      history.go(0)
    } catch (e) {}
  }

  useEffect(() => {
    fetchLinks()
  }, [fetchLinks])

  if (loading) return <Loader />

  return (
    <>{!loading && <LinksList links={links} deleteLink={deleteHandler} />}</>
  )
}
