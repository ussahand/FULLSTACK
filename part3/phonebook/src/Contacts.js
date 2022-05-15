const Contact = ({contact, delHandler}) =>
  <tr>
    <td>{contact.name}</td>
    <td>&nbsp; {contact.number}</td>
    <td><button id={contact.id} onClick={delHandler} >delete</button></td>
  </tr>

const Contacts = ({phoneBook, delHandler}) =>
  <table>
    <tbody>
      {phoneBook.map((cntct) => <Contact key={cntct.id} contact={cntct} delHandler={delHandler} />)}
    </tbody>
  </table>

export default Contacts;