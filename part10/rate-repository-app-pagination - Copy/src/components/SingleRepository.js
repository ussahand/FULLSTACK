import { FlatList, View, StyleSheet } from "react-native"
import { useParams } from "react-router-native"
import { useQuery } from "@apollo/client"
import RepositoryItem from "./RepositoryItem"
import ReviewItem from "./ReviewItem"
import { GET_REPOSITORY } from "../graphql/queries"
import { GET_REVIEWS } from "../graphql/queries"

const SingleRepository = () => {
  const {id} = useParams()
  const { data: repoInfo } = useQuery(GET_REPOSITORY,{variables:{repositoryId: id}})
  const first = 3;
  const { data: repViews, loading, fetchMore } = useQuery(GET_REVIEWS,{variables:{repositoryId: id, first}})

  if ( !repoInfo || !repViews )
    return null

  const handleFetchMore = () => {
    const canFetchMore = !loading && repViews.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    // console.log("there is more...")

    fetchMore({
      variables: {
        first,
        after: repViews.repository.reviews.pageInfo.endCursor,
      },
    });
  };


  const repViewsArray = repViews.repository.reviews.edges.map(node => node.node)
    // console.log(200, repViewsArray)

  // return <RepositoryItem item={repoInfo.repository} openGitHub />
  const ItemSeparator = () => <View style={styles.separator} />;

  return(
    <View style={{flex:1}}>
  <FlatList style={StyleSheet.absoluteFill}
  data={repViewsArray}
    ListHeaderComponent={() => <RepositoryItem item={repoInfo.repository} single />}
    ListHeaderComponentStyle={{marginBottom:10}}
    ItemSeparatorComponent = {ItemSeparator}
    renderItem = { ReviewItem }
    keyExtractor = {({id}) => id}
    onEndReached = {(dist)=> {
      // console.log("distance form end is:"+ dist.distanceFromEnd.toFixed())
      handleFetchMore()
    }}
    onEndReachedThreshold={0.4}

  />
  </View>
  )
}

const styles = StyleSheet.create({ separator: { height: 10, },});

export default SingleRepository