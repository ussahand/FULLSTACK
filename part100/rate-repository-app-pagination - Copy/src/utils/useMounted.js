import { useEffect, useRef } from 'react'

function useMounted(name) {
  const mounted = useRef(false)
  console.log(name, 'is on')

  useEffect(() => {
    mounted.current = true
    return () => { 
      mounted.current = false; 
      console.log(name, 'is off')
    }
  }, [mounted]);

  return mounted;
}

export default useMounted