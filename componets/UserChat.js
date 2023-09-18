import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const UserChat = ({ item }) => {
    const navigation = useNavigation();

    return (
        <Pressable onPress={() => navigation.navigate('Messages', {
            recepientId: item._id
        })} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, borderWidth: 0.7, borderColor: "D0D0D0", borderTopWidth: 0, borderWidth: 0, borderLeftWidth: 0, padding: 10 }}>
            <Image
                style={{ width: 50, height: 50, borderRadius: 25, resizeMode: "cover" }}
                source={{ uri: item?.image }}
            />
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 15, fontWeight: '500' }}>{item.name}</Text>
                <Text style={{ marginTop: 3, color: 'gray', fontWeight: '500' }}>last message come here</Text>
            </View>
            <View>
                <Text style={{ fontWeight: '400', fontSize: 11, color: '#585858' }}>4:00pm</Text>
            </View>
        </Pressable>
    )
}

export default UserChat

const styles = StyleSheet.create({})