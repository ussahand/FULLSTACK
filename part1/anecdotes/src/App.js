import { useState } from "react";

const appCSS = {
  backgroundColor: '#1b1c25',
  color: 'dimgray',
  height: '100vh',
};

const DispAnecdote = (props)=>{
  return(
    <>
    <h1>{props.title}</h1>
    <p>{props.anecdote} 
    <br />
    has {props.votes} votes 
    </p>
    </>
  )
}

const App = () => {
  document.body.style = 'margin: 0px; padding: 10px; border:1px solid yellow; background: #1b1c25';
  
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const next = ()=> 
    setSelected( Math.floor(Math.random() * 7) );
  
  const [votes, setVote] = useState(anecdotes.slice().fill(0))    
  const vote = () =>
    setVote( votes.slice(0, selected)
              .concat(votes[selected] + 1 )
              .concat(votes.slice(selected + 1 )) );
    // setVote( [...votes.slice(0,selected) , votes[selected]+1 , ...votes.slice(selected+1) ] )
  
  const popular = votes.findIndex( x => x === Math.max(...votes) )
  console.clear();
  // console.log(popular);

  return (
    <div style={appCSS}>
      <DispAnecdote title='Anecdote of the day' anecdote={anecdotes[selected]} votes={votes[selected]} />
      <p>
        <button onClick={ vote }>vote</button>
        <button onClick={ next }>next anecdote</button>
      </p>
      <DispAnecdote title='Anecdote with most votes' anecdote={anecdotes[popular]} votes={votes[popular]} />
    </div>
  );
}

export default App;
