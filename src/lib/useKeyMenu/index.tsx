import { useEffect, useState } from 'react'
import qs from 'query-string'

import { useLocation } from 'react-router-dom'

export const useKeyMenu = (defaultKey = ''): string => {
  const [selectedKey, setKey] = useState(defaultKey)
  const location = useLocation()

  const getKey = (pathname: string) => {
    const query = qs.parse(pathname)
    const pathsUrl = Object.keys(query)[0]

    setKey(pathsUrl.split('/').filter(Boolean)[0])
  }

  useEffect(() => {
    getKey(location.pathname)
  }, [location])

  return selectedKey
}
