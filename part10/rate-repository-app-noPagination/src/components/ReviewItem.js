import { StyleSheet } from "react-native"
import { Div, P } from "../styles"

const ReviewItem = ({item}) => {
  // console.log('reviw item', item)
  return (
    <Div style={review.box}>
      <Div id='left' style={review.left}>
        <P fontSize='h2' style={review.curve}>{item.rating}</P>
      </Div>
      <Div id='right' style={review.right}>
        <P fontSize='h4' bold>{item.user.username}</P>
        <P color='c2nd'>{item.createdAt}</P>
        <P style={{textAlign:'justify'}}>{item.text}</P>
      </Div>
    </Div>
  )
}

export default ReviewItem

const review = StyleSheet.create({
  box: { flexDirection: 'row', marginHorizontal: 10, borderWidth: 1, borderColor: 'yellow'  },
  left: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center'
  },
  right: { flex: 4 },
  curve: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'yellow',
    width: 60,
    height: 60,
    textAlign: 'center',
    lineHeight: 60,
  }

})