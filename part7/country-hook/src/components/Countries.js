export const Countries = ({ filterd }) =>
  <table >
    <thead >
      <tr>
        <th>Name</th>
        <th>Capital</th>
        <th>population</th>
        <th>Flag</th>
      </tr>
    </thead>
    <tbody >
      {filterd.map((c, i) =>
        <tr key={i} >
          <td>
            <i style={{ color: 'cyan' }}>{c.common}</i>
            <small> {c.common !== c.official && c.official}</small>
          </td>
          <td>{c.capital}</td>
          <td>{c.population}</td>
          <td><img src={c.flag} height='25' alt='falg' /></td>
        </tr>
      )}
    </tbody>
  </table>
