import Course from "./Course";

const appCSS = {
  backgroundColor: '#1b1c25',
  color: 'dimgray',
  height: '100vh',
};

const App = () => {
   document.body.style = 'margin: 0px; padding: 10px; border:1px solid yellow; background: #1b1c25';
  
   const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  console.clear();
  return (
    <div style={appCSS} >
    <Course courses = {courses} />
    </div>
  );
}

export default App;
