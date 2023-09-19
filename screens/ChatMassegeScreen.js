import { StyleSheet, View, Text, ScrollView, KeyboardAvoidingView, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import EmojiSelector from "react-native-emoji-selector";
import { UserType } from '../UserContext';
import { useNavigation, useRoute } from '@react-navigation/native';

const ChatMassegeScreen = () => {
    const [showEmojiSelector, setShowEmojiSelector] = useState(false);
    const [message, setMessage] = useState('');
    const [selectedImage, setSelectedImage] = useState("");
    const { userid } = useContext(UserType);
    const navigation = useNavigation();
    const route = useRoute();
    const [recepientData, setRecepientData] = useState();
    const { recepientId } = route.params;
    const hendleEmojiPress = () => {
        setShowEmojiSelector(!showEmojiSelector);
    }

    
    // ...

useLayoutEffect(() => {
    navigation.setOptions({
        headerTitle: "",
        headerLeft: () => (
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                <MaterialCommunityIcons onPress={()=>navigation.goBack()} name="backburger" size={24} color="black" />
            </View>
        ),
    });
}, []);

// ...

useEffect(() => {
    const fetchRecepientData = async () => {
        try {
            const response = await fetch(`http://192.168.1.3:8000/user/${recepientId}`);
            const data = await response.json(); // Wait for JSON parsing
            setRecepientData(data);
        } catch (err) {
            console.log("error retrieving Details", err);
        }
    }
    fetchRecepientData();
}, []);

    const hendSend = async (messageType, imageUri) => {
        try {
            const formData = new FormData();
            formData.append("senderId", userid);
            formData.append("recepientId", recepientId)

            //chack the massege type id image or normal text

            if (messageType === "image") {
                formData.append("messageType", "image");
                formData.append("imageFile", {
                    uri: imageUri,
                    name: 'image.jpg',
                    type: 'image/jpeg'
                })
            } else {
                formData.append("messageType", "text");
                formData.append("messageText", message)
            }

            const response = await fetch('http://192.168.1.3:8000/messages', {
                method: "POST",
                body: formData
            })

            if (response.ok) {
                setMessage("");
                setSelectedImage("");
            }
        } catch (err) {
            console.log("error in sending message", err);
        }
    }
    console.log(recepientData);
    // console.warn(recepientData);


    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
            <ScrollView>
                {/* // Scroll the chat meggages  */}
            </ScrollView>
            <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: "#ddd", alignItems: 'center', paddingVertical: 10, paddingHorizontal: 10, marginBottom: showEmojiSelector ? 0 : 20 }}>
                <Entypo onPress={hendleEmojiPress} style={{ marginRight: 5 }} name="emoji-flirt" size={28} color="black" />
                <TextInput value={message} onChangeText={(txt) => setMessage(txt)} style={{ flex: 1, paddingHorizontal: 20, height: 40, borderColor: '#ddd', borderRadius: 20, borderWidth: 1 }} placeholder='Type your message..' />
                <MaterialCommunityIcons style={{ marginLeft: 5 }} name="camera-image" size={28} color="#020d09" />
                <Ionicons style={{ marginLeft: 5 }} name="ios-mic" size={28} color="#031411" />
                <TouchableOpacity onPress={() => hendSend("text")}>
                    <MaterialCommunityIcons style={{ marginLeft: 5, marginRight: 5 }} name="send-circle-outline" size={28} color="#1c0111" />
                </TouchableOpacity>
            </View>
            {showEmojiSelector && (
                <EmojiSelector
                    onEmojiSelected={(emoji) => {
                        setMessage((prevMessage) => prevMessage + emoji);
                    }}
                // style={{ height: 350 }}
                />
            )}
        </KeyboardAvoidingView>
    )
}

export default ChatMassegeScreen

const styles = StyleSheet.create({})