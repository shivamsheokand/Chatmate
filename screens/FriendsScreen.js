import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import axios from 'axios';
import { UserType } from '../UserContext';

const FriendsScreen = () => {
    const { userid } = useContext(UserType);
    const [friendRequests, setFriendRequests] = useState([]);
    useEffect(() => {
        fetchfriendRequest();
    }, [])
    const fetchfriendRequest = async () => {
        try {
            const response = await axios.get(`http://192.168.1.4:8000/friend-request/${userid}`);
            if (response.status === 200) {
                const friendRequestsData = response.data.map((friendRequest) => ({
                    _id: friendRequest._id,
                    name: friendRequest.name,
                    email: friendRequest.email,
                }));
                setFriendRequests(friendRequestsData)
            }
        } catch (err) {
            console.log("error fetch friend request", err);
        }
    }
    console.log("gh",friendRequests);
    return (
        <View style={{ padding: 10, marginHorizontal: 12 }}>
            {friendRequests.length > 0 && <Text>Your Friend Requests!</Text>}
        </View>
    );
}

export default FriendsScreen

