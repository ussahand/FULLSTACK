const NewContact = props => {
  // console.log('mmmmm', props)
  return (
    <form onSubmit={props.addHandler} >
      <div>
        <label htmlFor="name" >name:</label>
        <input id="name" onChange={props.inputHandler} value={props.nameVal} placeholder='Enter name' required />
      </div>
      <div>
        <label htmlFor="number" >number:</label>
        <input id="number" onChange={props.inputHandler} value={props.numberVal}  />
      </div>
      <button type='submit' >add</button>
    </form>
  )
}

export default NewContact;