import { useRef, useEffect } from "react"
/**
 * useDebounce return a function that accept boolean 
 *
 * because setTimeout and setInterval don't have access to updated
 * values (they only have access to inital values) we need to
 * use ref to hold updated values and access to ref insise setInterval 
*/

const useDebounce = (callback, interval) => {
  // const [timerId, setTimerId] = useState()
  const timerId = useRef()
  const savedCallback = useRef()
  
  // console.log('useDebounce', timerId)
  useEffect(()=>{
    savedCallback.current = callback
  },[callback])

  const setDebouce = tf => {
    if (tf  && !timerId.current)
      timerId.current = setInterval(()=> {savedCallback.current()}, interval);
      // setTimerId( setInterval(()=> savedCallback.current(), interval) );
    else if (!tf)
      timerId.current = clearInterval(timerId.current) 
      // setTimerId( clearInterval(timerId) )
      // console.log('debounce porps:', tf, tf  && !timerId.current)
  }

  // useEffect(()=>{
  //   return ()=> timerId.current = clearInterval(timerId.current)
  //   // return ()=> setTimerId( clearInterval(timerId) )
  // },[])
  
  return setDebouce
}

/**
 * same functionality without refs
 * change state inside setInterval and after each render (interval) 
 * use callback inside useEffect
 *
 */

// const useDebounce = (callback, interval) => {
//   const [timerId, setTimerId] = useState()
//   const [state, runAgain] = useState()

//   useEffect(()=>{
//     callback()
//   },[state])

//   const setDebouce = tf => {
//     if (tf && !timerId) {
//       const id = setInterval(()=> runAgain(x => !x), interval);
//       setTimerId(id)
//     }else {
//       clearInterval(timerId)
//       setTimerId(null)
//     }
//   }
  
//   return setDebouce
// }

export default useDebounce
