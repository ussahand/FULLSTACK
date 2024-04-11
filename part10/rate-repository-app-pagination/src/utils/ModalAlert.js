/**
 * Create Alert Box with rn Modal api
 * you need to use useModalAlert hook with ModalAlert component
 * useModalAlert only render ModalAlert component when platform is web
 * otherwise it will run native Alert api
 * ModalAlert get the alert title and other props and show it also it toggle
 * modal state when any button pressed
 */


import { StyleSheet, Modal, View, Platform } from "react-native"
import { Pbutton, P } from "../styles"

export const ModalAlert = ({alertInfo:{title, message, options, buttons, show}, modalAlertToggle})=>{

  if( !title || !message)
    return null

  // for native platforms in first run, it should show alert box, but it doesn't and works well.
  // if( Platform.OS !== 'web') { // NativeAlert call moved to useModalAlert
  //   NativeAlert.alert(title, message, buttons, options)
  //   return
  // }

  let positive = null, negative = null, neutral = null

  if (!buttons?.length)
    positive = { text: 'OK' }

  if (buttons?.length)
    positive = buttons.filter(i => i.style === 'destructive')[0]

  if (buttons?.length >= 2)
    negative = buttons.filter(i => i.style === 'cancel')[0]

  if (buttons?.length >= 3)
    neutral = buttons.filter(i => i.style === 'default')[0]
  
  return (
    < >
      <Modal animationType='fade' visible={show} transparent>
        <View style={alertS.centeredView} >
          <View style={[alertS.modalView, alertS.shadow, { shadowColor: 'white' }]}>
            <P fontSize='h3' bold>{title}</P>
            <P >{message}</P>
            <View style={alertS.horizontalView}>
              {neutral && <Pbutton back='gray' text= {neutral.text} 
                onPress={() => {neutral?.onPress && neutral.onPress(); modalAlertToggle() }}
              />}
              
              {negative && <Pbutton back='blue' text= {negative.text} 
                onPress={() => {negative.onPress && negative.onPress(); modalAlertToggle() }} 
              />}
              
              {positive && <Pbutton back='red' text= {positive.text} 
                onPress={() => {positive?.onPress && positive.onPress(); modalAlertToggle() }}
              />}
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}

const alertS = StyleSheet.create({
  centeredView: {
    flex: 1,
    // flexGrow: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    // flex: 1,
    // margin: 50,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 30,
    alignItems: "stretch",
  },
  horizontalView: {
    flexDirection: 'row',
    justifyContent:'space-between',
    paddingVertical: 10,
    // width: 180,
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowRadius: 4,  // for ios
        shadowOpacity: 0.6, //for ios
        shadowColor: 'black', // for ios and android    
        shadowOffset: {width: 2, height: 5,},
      },
      android: {
        shadowColor: 'black', // for ios and android
        elevation: 8, // only for android    
      },
      web: {
        borderWidth: 2,
      },
    }),
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "left"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})
