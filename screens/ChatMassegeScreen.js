import { StyleSheet, View, Text, ScrollView, KeyboardAvoidingView, TextInput, TouchableOpacity, Image, Pressable } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import EmojiSelector from "react-native-emoji-selector";
import { UserType } from '../UserContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
// import * as ImagePicker from "expo-image-picker";
const ChatMassegeScreen = () => {
    const [showEmojiSelector, setShowEmojiSelector] = useState(false);
    const [message, setMessage] = useState('');
    const [meggages, setMeggages] = useState([]);
    const [selectedImage, setSelectedImage] = useState("");
    const { userid } = useContext(UserType);
    const navigation = useNavigation();
    const route = useRoute();
    const [recepientData, setRecepientData] = useState();
    const { recepientId } = route.params;
    const hendleEmojiPress = () => {
        setShowEmojiSelector(!showEmojiSelector);
    }

    const fetchMessages = async () => {
        try {
            const response = await fetch(`http://192.168.1.3:8000/messages/${userid}/${recepientId}`)

            const data = await response.json();

            if (response.ok) {
                setMeggages(data);
            } else {
                console.log("error Showing message", response.status.message);
            }

        } catch (err) {
            console.log("error fetching messages", err);
        }
    }
    useEffect(() => {
        fetchMessages()
    }, [])
    console.log("Messages", meggages);

    // ...

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "",
            headerLeft: () => (
                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                    <MaterialCommunityIcons onPress={() => navigation.goBack()} name="backburger" size={24} color="black" />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={{ width: 30, height: 30, resizeMode: 'cover', borderRadius: 15 }} source={{ uri: recepientData?.image }} />
                        <Text style={{ marginLeft: 8, fontSize: 15, fontWeight: "bold" }}>{recepientData?.name}</Text>
                    </View>
                </View>
            ),
        });
    }, [recepientData]);

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
                fetchMessages();
            }
        } catch (err) {
            console.log("error in sending message", err);
        }
    }
    // console.log(recepientData);
    // console.warn(recepientData);
    // console.warn(fetchMessages());
    const formatTime = (time) => {
        const options = { hour: 'numeric', minute: 'numeric' }
        return new Date(time).toLocaleString('en-US', options);
    }
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);
        if (!result.canceled) {
            hendSend("image", result.uri);
        }
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
            <ScrollView>
                {meggages.map((item, index) => {

                    if (item.messageType === "text") {
                        return (
                            <Pressable key={index} style={[
                                item?.senderId?._id === userid
                                    ? { alignSelf: 'flex-end', backgroundColor: "#DCF8C6", padding: 8, maxWidth: "60%", borderRadius: 7, margin: 10 }
                                    : {
                                        alignSelf: 'flex-start', backgroundColor: "#fff", padding: 8, maxWidth: "60%", borderRadius: 7, margin: 10
                                    }
                            ]}
                            >
                                <Text style={{ fontSize: 13, textAlign: 'left' }}>
                                    {item?.message}
                                </Text>
                                <Text style={{ textAlign: 'right', fontSize: 9, color: 'gray', marginTop: 3 }}>{formatTime(item.timeStamp)}</Text>
                            </Pressable>
                        )
                    }
                    if (item.messageType === "image") {
                        const baseUrl = 'E:\chat-app\Chatmate\api\files';
                        const imageUrl = item.imageUrl;
                        const filename = imageUrl.split("/").pop();
                        const source = { uri: baseUrl + filename }
                        return (
                            <Pressable
                                key={index} style={[
                                    item?.senderId?._id === userid
                                        ? { alignSelf: 'flex-end', backgroundColor: "#DCF8C6", padding: 8, maxWidth: "60%", borderRadius: 7, margin: 10 }
                                        : {
                                            alignSelf: 'flex-start', backgroundColor: "#fff", padding: 8, maxWidth: "60%", borderRadius: 7, margin: 10
                                        }
                                ]}>
                                    <View>
                                        <Image source={source} style={{width:200,height:200,borderRadius:7}}/>
                                        <Text style={{textAlign:'right',color:'gray',fontSize:9,position:'absolute',right:10,marginTop:3,bottom:7}}>{formatTime(item?.timeStamp)}</Text>
                                    </View>
                            </Pressable>
                        )
                    }
                })}
            </ScrollView>
            <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: "#ddd", alignItems: 'center', paddingVertical: 10, paddingHorizontal: 10, marginBottom: showEmojiSelector ? 0 : 20 }}>
                <Entypo onPress={hendleEmojiPress} style={{ marginRight: 5 }} name="emoji-flirt" size={28} color="black" />
                <TextInput value={message} onChangeText={(txt) => setMessage(txt)} style={{ flex: 1, paddingHorizontal: 20, height: 40, borderColor: '#ddd', borderRadius: 20, borderWidth: 1 }} placeholder='Type your message..' />
                <MaterialCommunityIcons onPress={pickImage} style={{ marginLeft: 5 }} name="camera-image" size={28} color="#020d09" />
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
                    style={{ height: 350 }}
                />
            )}
        </KeyboardAvoidingView>
    )
}

export default ChatMassegeScreen

const styles = StyleSheet.create({})