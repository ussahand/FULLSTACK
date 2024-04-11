import { StyleSheet, View, Text, Button as NativeButton, TextInput, Platform, Dimensions } from "react-native"

export const colors = {
  bg1st: '#1b1c25', // background dark
  bg2nd: '#292a2d', // light dark
  bg3rd: '#343434',
  gray: 'gray',
  c1st: '#0e639c',  // color blue;
  c2nd: '#8cdcf0', // light blue
  c3rd: 'white',
  c4th: 'gray',
  c5th: '#ce9178',
  c6th: '#b7dcaa',
  error: '#ec663a',
  warn: 'yellow',
}

export const hSize = {
  h1: 32, h2: 24, h3: 18, h4: 16, h5: 14, h6: 12, h7: 10
}

export const WINDOW = Dimensions.get('window');
//----------
const div = StyleSheet.create({
  container: {
    backgroundColor: colors.bg1st,
    // borderColor: 'yellow',
    // borderWidth: 1,
    padding:2,
  },
  bg2nd: { backgroundColor: colors.bg2nd, },
  bg3rd: { backgroundColor: colors.bg3rd, },
})

export const Div = ({ color, style, children, ...props }) =>
  <View style={[div.container, colors[color] && div[color], style]} {...props}>
    {children}
  </View>

//---------
const p = StyleSheet.create({
  parag: {
    color: colors.c1st,
    fontSize: hSize.h5, //react native default font size is 14 dp
    fontFamily: Platform.select({
      ios: 'Arial',
      android: 'Roboto',
      web: 'System',
      native: 'System',
      default: 'System',
    })
    // borderColor: 'yellow',
    // backgroundColor: 'white',
    // borderWidth: 1,
  },
  bold: {fontWeight: '900'},
  c2nd: { color: colors.c2nd },
  c3rd: { color: colors.c3rd },
  c4th: { color: colors.c4th },
  c5th: { color: colors.c5th },
  c6th: { color: colors.c6th },
  error: { color: colors.error },
  warn: { color: colors.warn },
  h1: { fontSize: hSize.h1 },
  h2: { fontSize: hSize.h2 },
  h3: { fontSize: hSize.h3 },
  h4: { fontSize: hSize.h4 },
  h5: { fontSize: hSize.h5 },
  h6: { fontSize: hSize.h6 },
  h7: { fontSize: hSize.h7 },
})

export const P = ({ color, fontSize, bold, style, children, ...props }) =>
  <Text style={[
    p.parag,
    colors[color] && p[color],
    hSize[fontSize] && p[fontSize],
    bold && p.bold,
    style]} {...props}
    >
    {children}
  </Text>

export const Perr = ({ color, ...props }) => // red text or error
  <P color={color || 'error'} {...props} />
//-------------------

const button = StyleSheet.create({
  box:{}
})
export const Button = ({ color, fontSize, style, children, ...props }) =>
  <NativeButton style={[
    button.box,
    colors[color] && p[color],
    hSize[fontSize] && p[fontSize],
    style]} {...props}
    >
    {children}
  </NativeButton>

//------------------------------------
const input = StyleSheet.create({
  box:{
    backgroundColor: colors.c4th,
    // marginHorizontal: 10,
    marginVertical: 5,
    fontSize: hSize.h2,
  },
  bg2nd: { backgroundColor: colors.bg2nd, },
  bg3rd: { backgroundColor: colors.bg3rd, },
})
export const Input = ({color, style, refs, ...props}) =>
    <TextInput ref={refs} placeholderTextColor={colors.c3rd} style={[input.box, colors[color] && input[color],style]} {...props} />
