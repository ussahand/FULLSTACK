import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-native';

import useRepositories from '../hooks/useRepositories';
import RepositoryListContainer from './RepositoryListContainer'
import useDebounce from '../utils/useDebounce';
import useKeyboard from '../utils/useKeyboard'
import { P } from '../styles'

const RepositoryList = () => {
  const nav = useNavigate()
  const [sortedItem, setSortedItem] = useState('latestRepo')
  const searchKeyword = useRef()
  const [query, setQuery] = useState('')
  const onFocus = useDebounce(()=>{setQuery(searchKeyword.current?.value)}, 1000)
  const {repositories, loading, error} = useRepositories(sortedItem, query)
  useKeyboard(onFocus) // in ios&android listen to virtual keyboard show hide

  // console.log((new Date).getSeconds(), searchKeyword.current?.value)

  if (error)
    return <P>{error}</P>

  const sort = {sortedItem, setSortedItem}
  const search = { searchKeyword, onFocus}
  return (
    <>
    {loading && <P>loading...</P>}
     {RepositoryListContainer({repositories, nav, sort, search})}
      {/* <RepositoryListContainer {...{repositories, nav, sort, search}} />     */}
    </>
  );
};

export default RepositoryList;
