import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { Octicons } from '@expo/vector-icons';
import { UserType } from '../UserContext';


const User = ({ item }) => {
    const { userid, setUserid } = useContext(UserType);
    const [requstsend, setRequstsend] = useState(false)
    const sendfrendrequst = async (currentUserid, selectedUserid) => {
        try {
            const response = await fetch('http://192.168.1.3:8000/friend-request',
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ currentUserid, selectedUserid }),
                })
            if (response.ok) {
                setRequstsend(true)
            }
        } catch (err) {
            console.log('error sending', err);
        }

    }
    return (
        <Pressable style={{ flexDirection: 'row', alignItems: 'center', marginVertical: '10' }}>
            <View style={{ marginLeft: 5 }}>
                <Octicons name="people" size={30} color="black" />
            </View>
            <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={{ fontWeight: "bold" }}>{item?.name}</Text>
                <Text style={{ marginTop: 4, color: 'gray' }}>{item?.email}</Text>
            </View>
            <TouchableOpacity style={{ marginRight: 10 }} onPress={() => sendfrendrequst(userid, item._id)}>
                <Octicons name="person-add" size={30} color="green" />
            </TouchableOpacity>
        </Pressable>
    )
}

export default User

const styles = StyleSheet.create({})