const Header = p => <h2>{p.course}</h2>

const SubContent = p => <p>{p.name} {p.exercises}</p>

const Content = ({ parts }) =>
  <>
    {
      parts.map((x, indx) => <SubContent key={x.id} name={x.name} exercises={x.exercises} />)
    }
  </>

const Total = ({ parts }) =>
  <h3>total of {parts.reduce((p, c) => p + c.exercises, 0)} exercises</h3>

const PerCourse = ({course}) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

const Course = ({ courses }) => {
  return (
    <>
      <h1>Web development curriculum</h1>
      {courses.map( crs => <PerCourse key={crs.id} course = {crs} /> )} 
    </>
  );
}

export default Course;
