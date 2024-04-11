/**
 * Create Alert Box with rn Modal api
 * you need to use this hook with ModalAlert component
 * useModalAlert only render ModalAlert component when platform is web
 * otherwise it will run native Alert api
 * ModalAlert get the alert title and other props and show it also it toggle
 * modal state when any button pressed
 */

import { useState } from "react";
import { Platform, Alert } from "react-native";

const useModalAlert = () => {
  const [alertInfo, setModalAlert] = useState({title:null, message:null, options:null, buttons:null, show:false})
  const modalAlertToggle = (title, message, buttons, options) => {
    // in Andriod and ios run NativeAlert and do not render
    if( Platform.OS !== 'web')
      Alert.alert(title, message, buttons, options)
    
    // if it's web then render for modalAlert
    else  
      setModalAlert(info => ({...{title, message, options, buttons, show: !info.show}}) )
  }

  return [alertInfo, modalAlertToggle]
}

export default useModalAlert