import { FlatList, View, StyleSheet } from "react-native"
import { useQuery } from "@apollo/client"
import MyReviewedItem from "./MyReviewedItem"
import { ME_INFO } from "../graphql/queries"
import { useNavigate } from 'react-router-native';

const MyReviews = ({modalAlertToggle}) => {
  const nav = useNavigate()
  const first = 4;
  const { data, loading, error, fetchMore } = useQuery(ME_INFO,{ variables:{includeReviews:true, first}})

  if ( !data )
    return null

  const handleFetchMore = () => {
    const canFetchMore = !loading && data.me.reviews.pageInfo.hasNextPage;
    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        first,
        after: data.me.reviews.pageInfo.endCursor,
      },
    });
  };

  const meArray = data.me.reviews.edges.map(node => node.node)

  const ItemSeparator = () => <View style={styles.separator} />;

  return(
    <View style={{ flex: 1 }}>
      <FlatList style={StyleSheet.absoluteFill}
        data={meArray}
        ListHeaderComponentStyle={{ marginBottom: 10 }}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({item})=><MyReviewedItem {...{item, nav, modalAlertToggle}} />}
        // renderItem={({item})=>MyReviewedItem({item, nav})}
        // renderItem={MyReviewedItem}
        keyExtractor={({ id }) => id}
        onEndReached={(dist) => {
          // console.log("distance form end is:"+ dist.distanceFromEnd.toFixed())
          handleFetchMore()
        }}
        onEndReachedThreshold={0.4}

      />
    </View>
  )
}

const styles = StyleSheet.create({ separator: { height: 10, },});

export default MyReviews