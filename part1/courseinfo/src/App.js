const appcss={
  backgroundColor: '#1b1c25',
  color: 'white',
  height: '100vh',
};
const App = () => {
  document.body.style = 'margin: 0px; padding: 10px; border:1px solid yellow; background: #1b1c25';
  console.log(document.body.style)
  console.log('Hello');
  return (
    <div style={appcss }>
      <div >calss fr om parent </div>
      <div >this is for you waht</div>
    </div>
  );
}

export default App;
