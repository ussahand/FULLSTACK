import { StyleSheet } from 'react-native';
import { Routes, Route, Navigate } from 'react-router-native';
import Constants from 'expo-constants';

import { Div } from './styles';
// import LogDebug from './LogDebug'
import AppBar from './components/AppBar';
import RepositoryList from './components/RepositoryList';
import SingleRepository from './components/SingleRepository';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import CreateReview from './components/CreateReview';
import SignUp from './components/SignUp';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    // height: '100%'
    flex:1
  },
});

const Main = () => {
  // console.log('main process.env', process.env)
  // console.log('main constants manifest', Constants)
  return (
    <Div style={styles.container} >
      {/* <LogDebug /> */}
      <AppBar />
      <Routes>
        <Route path='/repositories' element={<RepositoryList />} />
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/signout' element={<SignOut/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/newReview' element={<CreateReview/>} />
        <Route path='/repositories/:id' element={<SingleRepository />} />
        <Route path='*' element={<Navigate to="/repositories" replace />} />
        {/* <Route path='*' element={<Navigate to="/repositories" replace />} /> */}
      </Routes>
    </Div>
  );
};

export default Main;

/*
const layout = (e) =>{
  // const windim = useWindowDimensions();
  // console.clear();
  console.log('Platform:', Platform);
  console.log('layout dim:', e.nativeEvent.layout);
  console.log('pixel ratio get:', PixelRatio.get());
  console.log('getFontScale:', PixelRatio.getFontScale());
  console.log('getPixelSizeForLayoutSize:', PixelRatio.getPixelSizeForLayoutSize(200));
  console.log('roundToNearestPixel:', PixelRatio.roundToNearestPixel(200));
  console.log('Dimensions.get screen', Dimensions.get('screen')) // Size of the device's screen
  console.log('Dimensions.get window',  Dimensions.get('window')) // Size of the visible Application window
  // console.log('Windo dims:', windim);
}
*/
