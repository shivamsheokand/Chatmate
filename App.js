import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StactNavi from './Navigation/StackNavigation'

export default function App() {
  return (
    <View style={{flex:1}}>
      <StactNavi />
    </View>
  );
}

const styles = StyleSheet.create({});
