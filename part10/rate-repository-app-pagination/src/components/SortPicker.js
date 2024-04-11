import { useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import { StyleSheet } from 'react-native'
import { Div, P, colors, hSize } from '../styles'

const SortPicker = ({sortedItem, setSortedItem}) => {

  return <Div style={ss.box}>
    <P style={ss.title}>Sort by : </P>
    <Picker 
    mode='dropdown'
    style={ss.picker} // for web and android
    itemStyle={ss.picker} // for windows and ios
    
    selectedValue={sortedItem} 
    onValueChange={ (itemValue) => setSortedItem(itemValue)}
  >
    <Picker.Item style={ss.item} label='Latest repositories' value='latestRepo' />
    <Picker.Item style={ss.item} label='Highest rated repositories' value='highestRate' />
    <Picker.Item style={ss.item} label='Lowest rated repositories' value='lowestRate' />
  </Picker>
  </Div>
}

export default SortPicker

const ss = StyleSheet.create({
  box: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor : colors.bg3rd,
    height: hSize.h1*2, // providing 'height' prevent ios from growing to cover all items
    alignItems: 'center',
    paddingHorizontal: 5
  },
  title: {
    // flex: 0,
    fontSize: hSize.h3,
  },
  picker:{
    flex: 1,
    color: colors.c3rd,
    fontSize: hSize.h3,
    backgroundColor: colors.gray,
  },
  item: {
    backgroundColor: colors.bg1st,
  },
})
