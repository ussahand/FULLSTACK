import { useState, useEffect } from 'react'
import axios from 'axios'

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios.get(baseUrl)
      .then(resp => setResources(resp.data))
  }, [baseUrl])

  const create = (resource) => {
    axios.post(baseUrl, resource)
      .then(({ data }) => setResources(resources.concat(data)))
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}
