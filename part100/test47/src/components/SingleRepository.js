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
  const { data: repViews } = useQuery(GET_REVIEWS,{variables:{repositoryId: id}})

  if ( !repoInfo || !repViews )
    return null

  const repViewsArray = repViews.repository.reviews.edges.map(node => node.node)
    // console.log(200, repViewsArray)

  // return <RepositoryItem item={repoInfo.repository} openGitHub />
  const ItemSeparator = () => <View style={styles.separator} />;

  return(
  <FlatList
  data={repViewsArray}
    ListHeaderComponent={() => <RepositoryItem item={repoInfo.repository} single />}
    ListHeaderComponentStyle={{marginBottom:10}}
    ItemSeparatorComponent = {ItemSeparator}
    renderItem = { ReviewItem }
    keyExtractor = {({id}) => id}
  />
  )
}

const styles = StyleSheet.create({ separator: { height: 10, },});

export default SingleRepository