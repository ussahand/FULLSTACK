const appCSS = {
  backgroundColor: '#1b1c25',
  color: 'dimgray',
  height: '100vh',
};

const Header = p => <h1>{p.course}</h1>

const SubContent = p => <p>{p.name} {p.exercises}</p>

const Content = ({parts}) =>
    <>
      {
      parts.map( (x,indx)=> <SubContent key={indx} name={x.name} exercises={x.exercises} /> )
      }
    </>

const Total = ({exercises}) => 
  <p>Number of exercises {exercises[0] + exercises[1] + exercises[2]}</p>

  const App = () => {
  // document.body.style = 'margin: 0px; padding: 10px; border:1px solid yellow; background: #1b1c25';
  
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const exercises = course.parts.map(x => x.exercises);
  console.clear();
  console.log('Hello world', exercises);
  return (
    <div> {/*style={appCSS}*/}
      <Header course={course.name} />
      <Content parts={course.parts}  />
      <Total exercises={exercises} />
    </div>
  );
}

export default App;
