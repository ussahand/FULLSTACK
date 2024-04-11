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
  const { repositories, nav, search, sort} = props
  // useMounted('RepositoryListContainer')

  // console.log('in the containor')
  return < FlatList
    data={repositories}
    ItemSeparatorComponent={ItemSeparator}
    renderItem={({ item }) => (<RepositoryItem {...{ item, nav }} />)}
    keyExtractor = {({id}) => id}
    // 1st soluttion: use function isntead of component
    ListHeaderComponent={SearchSort({ search, sort})}

    // 2nd solution: use componenet and in the componenet Input use autoFocus
    // ListHeaderComponent={()=> <SearchSort {...{search, sort}} />}
  />
}

export default RepositoryListContainer;
