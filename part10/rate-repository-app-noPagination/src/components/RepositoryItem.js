import { Image, StyleSheet, Pressable } from "react-native"

import * as Linking from 'expo-linking';
import { Div, P, Button } from "../styles"

const kConvert = n =>
  n >= 1000 ? (Math.round(n / 100) / 10 + 'K') : n

const RepositoryItem = ({ item, single, nav }) => {
  // console.log('Repository item: ', Object.entries(item))
  return (
    <Pressable onPress={()=> !single && nav(`/repositories/${item.id}`)}>
      <Div id='card' style={card.box} color='bg3rd' testID="repositoryItem">
        <Div id='top' style={card.topRow}>
          <Div id='left' style={card.left} >
            <Image
              source={{ uri: item.ownerAvatarUrl }}
              style={card.image}
            />
          </Div>
          <Div id='right' style={card.right}>
            <P id='title' color='c3rd' fontSize='h4' >{item.fullName}</P>
            <P id='title2' fontSize='h4' style={{ marginVertical: 20 }} >{item.description}</P>
            <Button id='category' title={item.language} />
          </Div>
        </Div>
        <Div id='bottomRates' style={card.bottomRates}>
          <Div>
            <P bold>{kConvert(item.stargazersCount)}</P>
            <P>Stars</P>
          </Div>
          <Div>
            <P bold>{kConvert(item.forksCount)}</P>
            <P>Forks</P>
          </Div>
          <Div>
            <P bold>{kConvert(item.reviewCount)}</P>
            <P>Reviews</P>
          </Div>
          <Div>
            <P bold>{kConvert(item.ratingAverage)}</P>
            <P>Rating</P>
          </Div>
        </Div>
        {single && <Button onPress={() => Linking.openURL(item.url)} title="Open in GitHub" />}
      </Div>
    </Pressable> 
  )
}

const card = StyleSheet.create({
  box: { marginHorizontal: 10, borderWidth: 1, borderColor: 'yellow' },
  topRow: { flexDirection: 'row' },
  left: { flex: 1 },
  right: { flex: 3, justifyContent: 'space-between', alignItems: 'flex-start' },
  image: { width: 80, height: 80, borderRadius: 10 },
  bottomRates: { flexDirection: 'row', justifyContent: 'space-around' },

})

export default RepositoryItem