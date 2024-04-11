import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import SearchSort from './SearchSort';
// import useMounted from '../utils/useMounted'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListContainer = (props) => {
  const { repositories, nav, search, sort, loading, onEndReach} = props
  // useMounted('RepositoryListContainer')

  // console.log('in the containor')
  // return <View style={{flex:'1'}}>  
  return < FlatList
    data={repositories}
    ItemSeparatorComponent={ItemSeparator}
    renderItem={({ item }) => (<RepositoryItem {...{ item, nav }} />)}
    keyExtractor = {({id}) => id}
    onEndReached = {(distanceFromEnd)=> onEndReach(distanceFromEnd)}
    onEndReachedThreshold={0.2}
    // initialNumToR7} // 2 * 4 + 1
    onMomentumScrollBegin={()=>{
      console.log('onMomentumScrollStart...')
  }}
  // onMomentumScrollEnd={()=>{
  //     console.log('onMomentumScrollEnd!!!')
  // }}
  onScroll={({ nativeEvent }) => {
    if (nativeEvent.contentOffset.y === 0) {
      console.log('scroll end', nativeEvent.contentOffset)
    }
  }}
  // onScroll={() => {
  //   console.log("scroll");
  // }}
  scrollEventThrottle={16}
    // 1st soluttion: use function isntead of component
    ListHeaderComponent={SearchSort({ search, sort, loading})}

    // 2nd solution: use componenet and in the componenet Input use autoFocus
    // ListHeaderComponent={()=> <SearchSort {...{search, sort}} />}
  />
  // </View>
}

export default RepositoryListContainer;

/**
 * 
 * 
 */