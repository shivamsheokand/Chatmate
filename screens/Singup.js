import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'


const Signup = (props) => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    return (
        <View style={styles.maincontainer}>
            <View style={styles.image}>
                <Image
                    source={require('../assets/images/singup.png')}
                    style={{ height: 150, width: 150, resizeMode: 'contain', marginBottom: 20, marginTop: 30 }}
                />
            </View>
            <View style={styles.loginBox} >
                <View style={styles.loginView}>
                    <Text style={{ fontSize: 12, fontWeight: '500', color: 'orange' }}>First Name</Text>
                    <TextInput placeholder='Enter Your First-Name' style={styles.inputtext} value={firstname} onChangeText={txt => setFirstname(txt)} />
                    <Text style={{ fontSize: 12, fontWeight: '500', color: 'orange' }}>Last Name</Text>
                    <TextInput placeholder='Enter Your Last-Name' style={styles.inputtext}
                        value={lastname} onChangeText={txt => setLastname(txt)} />
                    <Text style={{ fontSize: 12, fontWeight: '500', color: 'orange' }}>Email</Text>
                    <TextInput placeholder='Enter Your Email' style={styles.inputtext}
                        value={email} onChangeText={txt => setEmail(txt)} />
                    <Text style={{ fontSize: 12, fontWeight: '500', color: 'orange' }}>Password</Text>
                    <TextInput placeholder='Enter Your password' style={styles.inputtext} value={password} onChangeText={txt => setPassword(txt)} />
                    <Text style={{ fontSize: 12, fontWeight: '500', color: 'orange' }}>Confirm Password</Text>
                    <TextInput placeholder='Confirm Your password' style={styles.inputtext} value={confirmpassword} onChangeText={txt => setConfirmpassword(txt)} />
                    <TouchableOpacity >
                        <View style={styles.submitButton}>
                            <Text style={{ color: '#fff', fontWeight: '700', textAlign: 'center' }}>Sing Up</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.navigation.navigate("LockScreen")}>
                        <Text style={{ marginTop: 25, textAlign: 'center' }}>Already have any account? Sing In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{ marginTop: 60, textAlign: 'center', fontSize: 17 }}>Designed By : <Text style={{ marginTop: 70, textAlign: 'center', color: 'orange', textDecorationLine: 'underline', fontWeight: 'bold', fontSize: 17 }}>Sam</Text> </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Signup;

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
        padding: 30,
        minHeight: 700,
        minWidth: 400,
        backgroundColor: '#FFFFFF',
        // borderRadius: 45,
        borderTopLeftRadius: 85
    },
    inputtext: {
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 10,
        padding: 8,
        minWidth: 200,
        margin: 2
    },
    submitButton: {
        backgroundColor: '#000',
        borderWidth: 1,
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 18
    }
})


