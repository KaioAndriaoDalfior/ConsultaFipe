import { NavigationContainer } from '@react-navigation/native';

import MainStack from './components/src/Navigators/MainStack';

const App = () => {
 return(
  <NavigationContainer>
    <MainStack />
  </NavigationContainer>
 )
};
export default App;
