const Search = props =>
  <p>
    filter shown with
    <input onChange={props.handler} value={props.value} />
  </p>


export default Search;