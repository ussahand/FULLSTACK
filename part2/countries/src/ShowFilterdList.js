const ShowFilterdList = ( {list, handler} ) =>
  list.map(c =>
    <span key={c.name} >{c.name}
      {/* in name like as iran (republic) must inside () be removed */}
      <button id={c.name.split(' (')[0]} onClick={handler} >show</button>
      <br />
    </span>
  )

  export default ShowFilterdList;