import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import { GET_REPOSITORIES } from '../graphql/queries'

const orderValueExtract = sortBy => {
  switch (sortBy) {
    case 'highestRate':
      return {orderBy: 'RATING_AVERAGE', orderDirection: 'DESC'}
    case 'lowestRate':
      return {orderBy: 'RATING_AVERAGE', orderDirection: 'ASC'}
    default:
      return {orderBy: 'CREATED_AT', orderDirection: 'DESC'}
  }
}

export const useGraphQl = (sortBy, searchKeyword) => {

  const orderValue = orderValueExtract(sortBy)

  const {data, loading, error} = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: {...orderValue, searchKeyword}
  })
  
  // console.log('repo', sortBy, searchKeyword)
  // useEffect(()=>{
  //   loadData()
  // } ,[sortBy, searchKeyword])

  if (error) {
    console.log('gql error:', error)
    const errMessage = 'error in loadgin data' + error.message;
    return { loading, repositories: [], error: errMessage }
  }
  
  // console.log('qql fetched data: ', data)
  const repositories = data?.repositories?.edges?.map(x => x.node)
  // console.log('repositories', repositories)
  
  return { loading, repositories, error: null }
};


//---use rest api
export const useRestApi = () => {
  const [repositories, setRepositories] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchRepo =  () => {
    setLoading(true)
    const URL = 'http://10.0.0.14:5000/api/repositories'
    fetch(URL)
      .then(resp => resp.json())
      .then(json => {
        // console.log('fetch output: ', json)
        const repositories = json.edges.map(({ node }) => node)
        setLoading(false)
        setRepositories(repositories)
      })
      .catch(error => {
        setLoading(false)
        setError(`network error: ${error.message}`)
      })
  }

  useEffect(() => {
    fetchRepo()
  }, [])

  return { loading, repositories, error, refetch: fetchRepo }
};

const useRepositories = useGraphQl
export default useRepositories;

/*
  const fetchRepo = async () => {
    setLoading(true)
    const URL = 'http://10.0.0.14:5000/api/repositories'

    try {
      const json = await fetch(URL)
      .then( resp => { console.log(300, resp); return resp.json()})

    console.log('fetch output: ', json )
    const repositories = json.edges.map( ({node}) => node)

    setLoading(false)
    setRepositories(repositories)
    } catch (error) {
      console.log('network error:', error.message)
      setLoading(false)
      setError(`network error: ${error.message}`)
    }
  }
*/