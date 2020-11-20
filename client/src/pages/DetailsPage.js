import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/auth.context'
import { Loader } from '../components/Loader'
import { LinkCard } from '../components/LinkCard'

export const DetailsPage = () => {
  const { token } = useContext(AuthContext)
  const { request, loading } = useHttp()
  const [link, setLink] = useState(null)
  const [baseUrl, setBaseUrl] = useState('')
  const linkId = useParams().id

  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/links/${linkId}`, 'GET', null, {
        Authorization: `Bearer ${token}`,
      })
      setLink(fetched.link)
      setBaseUrl(fetched.baseUrl)
    } catch (e) {}
  }, [token, linkId, request])

  useEffect(() => {
    getLink()
  }, [getLink])

  if (loading) return <Loader />

  return <>{!loading && link && <LinkCard link={link} baseUrl={baseUrl} />}</>
}
