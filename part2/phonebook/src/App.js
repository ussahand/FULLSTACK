import { useEffect, useState } from "react";
import crud from "./services/CRUD";
import Contacts from "./Contacts";
import Search from "./Search";
import NewContact from "./NewContact";
import MessageBox from "./MessageBox";
/***
 * add OK/cancel buttton
 * add green for success
 * add redd for failure
 */

const appCSS = {
  backgroundColor: '#1b1c25',
  color: 'dimgray',
  height: '100vh',
};

const filter = (phoneBook, filterText) =>
  phoneBook
    .filter(cntct =>
      RegExp(filterText, 'i') //case incensitive
        .test(cntct.name)
    )

const cmp = (obj1, obj2, attribute) =>
  obj1[attribute].toString().toLowerCase() === obj2[attribute].toString().toLowerCase()

const App = () => {
  document.body.style = 'margin: 0px; padding: 10px; border:1px solid yellow; background: #1b1c25';
  // console.clear();

  const [phoneBook, setPhone] = useState([]);
  const addContact = () => (e) => {
    e.preventDefault();
    setSearch(''); // setSearch must be here or in the useEffect

    const indx = phoneBook.findIndex( x => cmp(x , input, 'name' ));
    if (indx !== -1) { //if it exists already
      const yn = window.confirm(`${input.name} is already added to phonebook, replace the old number with a new one?`)
      if (yn) {
        const contact = { ...phoneBook[indx] }
        const changedContact = { ...contact, number: input.number }
        crud
          .dbUpdate(changedContact, appMsg())
          .then(() => setPhone(phoneBook.map((x, i) => i === indx ? changedContact : x)))
      }
      setInput({ name: '', number: '' })//MUST BE HERE OR IN useEffect
    } else {
      crud
        .dbAdd(input, appMsg())
        .then(resp => setPhone(phoneBook.slice().concat(resp)))
      setInput({ name: '', number: '' })//MUST BE HERE OR IN useEffect
    }
  }

  const deleteContact = () => (e) =>{
    const delContact = phoneBook.find( x=> cmp(x , e.target, 'id'));
    const yn = window.confirm(`Do you want to delete ${delContact.name} ?`)
    if( yn )
      crud
        .dbDelete(delContact, appMsg())
        .then(() => setPhone(phoneBook.filter(x => x.id.toString() !== e.target.id)))   
  }
  

  // Update name & number text input elements
  const [input, setInput] = useState({name: '', number: '' });
  const inputChange = () => (e)=>
    setInput( Object.assign( {}, input, {[e.target.id] : e.target.value  }) )

  const [search, setSearch] = useState(''); //filter by name
  const changeSearch = () => (e)=> setSearch( e.target.value )

  const [msg, setMsg] = useState({text:'', status:'NONE'})
  const appMsg = () => (msg, status) => {
    setMsg({ text: msg, status: status });
    setTimeout(() => {
      setMsg({ text: '', status: 'NONE' });
    }, 5000);
  }
  // const [confirm, setConfirm] = useState(false)

  useEffect( ()=>{
    crud
      .dbGetAll( appMsg() )
      .then( data => setPhone( data ))

  },[])
  useEffect(()=>{
  if(filteredBook.length === 0 && search.length >0  )
    setMsg({text:'Change your filter to see the contacts', status:'WARNING'})
    setTimeout(() => setMsg({ text: '', status: 'NONE' }), 4000);
  },[search])

  const filteredBook = filter( phoneBook, search)

  return (
    <div style={appCSS} >
      <h1>Phonebook</h1>
      <MessageBox msg={msg} />
      <Search handler={changeSearch()} value={search} />
      <h1>add a new</h1>
      <NewContact
        inputHandler={inputChange()}
        addHandler={addContact()}
        nameVal={input.name}
        numberVal={input.number}
      />
      <h1>Numbers</h1>
      <Contacts phoneBook={filteredBook} delHandler={ deleteContact() } />
    </div>
  );
}

export default App;
