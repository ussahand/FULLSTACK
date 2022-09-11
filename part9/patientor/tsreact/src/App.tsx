interface CoursePartBase {
  name: string;
  exerciseCount: number;
  description?: string;
  type: string;
}

interface CourseNormalPart extends CoursePartBase {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBase {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartBase {
  type: "special";
  requirements: string[];
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default function App() {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the easy course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the hard course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total total={courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)} />
    </div>
  );
}

function Header({ name }: { name: string }) {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

function Content({ parts }: { parts: CoursePart[] }) {
  return (
    <>
      {parts.map((x, i) =>
        <ContentItem key={i} item={x} />)}
    </>
  )
}

function ContentItem({ item }: { item: CoursePart }) {
  // const attributes = Object.keys(item)
  // const values = Object.values(item)
  // console.log(400, Object.keys(item), Object.values(item))
  // {attributes.map( (a,i) => <p key={i}>{a} {values[i]}</p>)}
  let jsx
  try {
    switch (item.type) {
      case 'normal':
        jsx = <div>
          <h3>{item.name} {item.exerciseCount}</h3>
          {item.description}
        </div>
        break;
      case 'groupProject':
        jsx = <div>
          <h3>{item.name} {item.exerciseCount}</h3>
          project exercises {item.groupProjectCount}
        </div>
        break;
      case 'submission':
        jsx = <div>
          <h3>{item.name} {item.exerciseCount}</h3>
          {item.description}
          <br />
          submit to {item.exerciseSubmissionLink}
        </div>
        break;
      case 'special':
        jsx = <div>
          <h3>{item.name} {item.exerciseCount}</h3>
          {item.description}
          <br />
          required skills: {item.requirements.join(', ')}
        </div>
        break;
      default:
        assertNever(item)
    }
  } catch (e) { console.log(555, e) }
  return (
    <div className="head">
      {jsx}
    </div>
  )
}

function Total({ total }: { total: number }) {
  return (
    <p>
      Number of exercises: {total}
    </p>
  )
}
