import { useEffect } from 'react';
import { Keyboard } from 'react-native';

const useKeyboard = (enableCallback) => {
  // const [keyboardStatus, setKeyboardStatus] = useState()
  
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      // setKeyboardStatus('keyboard shown')
      // console.log('show')
      enableCallback(true)
    })
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      // setKeyboardStatus('keyboard hidden')
      // console.log('hide')
      enableCallback(false)
    })
    
    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [])
}

export default useKeyboard