// import { useState } from 'react'
import SortPicker from './SortPicker'
import { Input } from '../styles'

function SearchSort ({ search, sort }) {
  // const [value, setValue] = useState('')
  // console.log('sort&focus: ', sort.sortedItem, search.value, search.focus)

  return (
    <>
      <Input 
        // refs={search.searchKeyword}
        onChangeText={(t)=>search.searchKeyword.current = {value: t}}
        // value={value}
        // onChangeText={setValue}
        
        onFocus={()=>search.onFocus(true)}
        onBlur={()=>search.onFocus(false)}
        placeholder='Search keyword'
        style={{marginHorizontal:10}}
        // autoFocus={true}
      />
      {/* <SortPicker {...sort} /> */}
      {SortPicker(sort) }
    </>
  )
}

export default SearchSort
