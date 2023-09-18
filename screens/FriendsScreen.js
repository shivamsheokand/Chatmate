import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { UserType } from "../UserContext";
// import FriendRequest from "../components/FriendRequest";

const FriendsScreen = () => {
    const { userid } = useContext(UserType);
    const [friendRequests, setFriendRequests] = useState([]);
    useEffect(() => {
        fetchFriendRequest();
    }, []);

    const fetchFriendRequest = async () => {
        try {
            const response = await axios.get(
                `http://192.168.1.3:8000/friend-request/${userid}`
            );
            if (response.status === 200) {
                const friendRequestsData = response.data.map((friendRequest) => ({
                    _id: friendRequest._id,
                    name: friendRequest.name,
                    email: friendRequest.email,
                }));

                setFriendRequests(friendRequestsData);
            }
        } catch (err) {
            console.log("error message", err);
        }
    };

    console.log(friendRequests);
    return (
        <View style={{ padding: 10, marginHorizontal: 12 }}>
            {friendRequests.length > 0 && <Text>Your Friend Requests!</Text>}

            {/* {friendRequests.map((item, index) => (
                <FriendRequest
                    key={index}
                    item={item}
                    friendRequests={friendRequests}
                    setFriendRequests={setFriendRequests}
                />
            ))} */}
        </View>
    );
};

export default FriendsScreen;

const styles = StyleSheet.create({});