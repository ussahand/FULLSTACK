import { StyleSheet } from "react-native"
import { Div, P, Button } from "../styles"
import useDeleteReview from "../hooks/useDeleteReview"

const MyReviewedItem = ({item, nav, modalAlertToggle}) => {
  const { deleteReview } = useDeleteReview()

  const onView = ()=> nav(`/repositories/${item.repositoryId}`)

  const onDeleteConfirmed = (dleteConfirmation) => {
    if(dleteConfirmation) {
      deleteReview(item.id)
      // console.log('item deleting: ', item)
    }

  }

  const onDelete = () => modalAlertToggle('Delete review',
    `Are you sure you want to delete "${item.repositoryId}" review?`,
    [
      // {type:'neutral', text: 'LATER', style: 'default', onPress: () => onDeleteConfirmed(false) },
      {type:'negative', text: 'CANCEL', style: 'cancel', },
      {type:'positive', text: 'DELETE', style: 'destructive', onPress: () => onDeleteConfirmed(true) },
    ],
    {cancelable: true}, // only for android
  ) 

  return (
    <Div style={review.mainBox}>
      <Div style={review.box}>
        <Div id='left' style={review.left}>
          <P fontSize='h2' style={review.curve}>{item.rating}</P>
        </Div>
        <Div id='right' style={review.right}>
          <P fontSize='h4' bold>{item.repository.fullName}</P>
          <P color='c2nd'>{item.createdAt}</P>
          <P style={{ textAlign: 'justify' }}>{item.text}</P>
        </Div>

      </Div>
       <Div style={review.actions}>
        <Button title="View repository" onPress={onView} />
        <Button title="Delete review" color='c6th' onPress={onDelete} />
      </Div> 
    </Div>
  )
}

export default MyReviewedItem

const review = StyleSheet.create({
  mainBox: { marginHorizontal: 10, borderWidth: 1, borderColor: 'yellow' },
  box: { flexDirection: 'row', textAlign: 'center', marginHorizontal: 10, },
  left: {
    flex: 1,
    alignItems: 'center',
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
  },
  actions: {
    flexDirection: 'row', marginHorizontal: 10,
    justifyContent: 'space-around',
  }

})