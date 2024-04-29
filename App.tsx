import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

import { Groups } from '@screens/Groups';
import theme from '@theme/index';
import { Loading } from '@components/Loading';
import { NewGroup } from '@screens/NewGroup';
import { Players } from '@screens/Players';

export default function App() {
  let [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="auto" />
      {fontsLoaded ? <Players /> : <Loading />}
    </ThemeProvider>
  );
}
