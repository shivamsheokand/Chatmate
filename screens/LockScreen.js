import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from "@react-navigation/native";

const LockScreen = (props) => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    return (
        <View style={styles.maincontainer}>
            <View style={styles.image}>
                <Image
                    source={require('../assets/images/login1.png')}
                    style={{ height: 250, width: 250, resizeMode: 'contain', marginBottom: 20, marginTop: 30 }}
                />
            </View>
            <View style={styles.loginBox} >
                <View style={styles.loginView}>
                    <Text style={{ fontSize: 18, fontWeight: '500'}}>Email</Text>
                    <TextInput placeholder='Enter Your Email' style={styles.textinput} value={email} onChangeText={txt=>setEmail(txt)} />
                    <Text style={{ fontSize: 18, fontWeight: '500' }}>Password</Text>
                    <TextInput placeholder='Enter Your password' style={styles.textinput} value={password} onChangeText={txt=>setPassword(txt)} />
                    <TouchableOpacity>
                        <View style={styles.submitButton}>
                            <Text style={{ color: '#fff', fontWeight: '700', textAlign: 'center' }}>Submit</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>props.navigation.navigate("Singup")}>
                        <Text style={{marginTop:70,textAlign:'center'}}>Don't have any account? Sing Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{marginTop:70,textAlign:'center',fontSize:17}}>Designed By : <Text style={{marginTop:70,textAlign:'center',color:'orange', textDecorationLine:'underline',fontWeight:'bold',fontSize:17}}>Sam</Text> </Text>
                    </TouchableOpacity>
                    
                </View>
            </View>
        </View>
    )
}

export default LockScreen

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        backgroundColor: "#181818",
    },
    image: {
        // flex:1,
        backgroundColor: "#181818",
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginBox: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginView: {
        // flex: 1,
        padding: 40,
        minHeight: 700,
        minWidth: 400,
        backgroundColor: '#FFFFFF',
        // borderRadius: 45,
        borderTopLeftRadius:95
    },
    textinput: {
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        minWidth: 200,
        margin:8
    },
    submitButton: {
        backgroundColor:'#000',
        borderWidth:1,
        padding: 10,
        borderRadius:20,
        alignItems:'center',
        marginTop:20
    }
})