import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Home = () => {
    return (
        <View style={styles.container}>
        <Text style={styles.logo}>Hello</Text>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'purple',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo:{
        textAlign: 'center',
        color: 'white',
        fontSize:30
    }
})