import { Link } from 'react-router-native';
import { ScrollView, StyleSheet } from 'react-native';
import { Div, P, WINDOW } from '../styles';

import { ME_INFO } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const AppBar = () => {
  const { data } = useQuery(ME_INFO)
  const user = data?.me?.username

  return (
    <Div color='bg2nd' style={ss.box}>
      <ScrollView horizontal contentContainerStyle={ss.menu}>
        <Link to='/repositories'><P fontSize='h3'> Repositories </P></Link>
        {user && <Link to='/newReview'><P fontSize='h3'> Create a review </P></Link>}
        {!user && <Link to='/signin'><P fontSize='h3'> Signin </P></Link>}
        {user && <Link to='/signout'><P fontSize='h3'>Sign out</P></Link>}
        {!user && <Link to='/signup'><P fontSize='h3'>Sign up</P></Link>}
      </ScrollView>
    </Div>
  )
};

const ss = StyleSheet.create({
  box: {height: WINDOW.height / 10},
  menu: { alignItems: 'center' }
})

export default AppBar;