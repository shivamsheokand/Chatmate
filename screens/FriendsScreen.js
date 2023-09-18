// import { StyleSheet, Text, View } from "react-native";
// import React, { useEffect, useContext, useState } from "react";
// import axios from "axios";
// import { UserType } from "../UserContext";
// // import FriendRequest from "../components/FriendRequest";

// const FriendsScreen = () => {
//     const { userid, setUserid } = useContext(UserType);
//     const [friendRequests, setFriendRequests] = useState([]);
//     useEffect(() => {
//         fetchFriendRequests();
//     }, []);
//     const fetchFriendRequests = async () => {
//         try {
//             const response = await axios.get(
//                 `http://192.168.1.3:8000/friend-request/${userid}`
//             );
//             if (response.status === 200) {
//                 const friendRequestsData = response.data.map((friendRequest) => ({
//                     _id: friendRequest._id,
//                     name: friendRequest.name,
//                     email: friendRequest.email,
//                 }));

//                 setFriendRequests(friendRequestsData);
//             }
//         } catch (err) {
//             console.log("error message", err);
//         }
//     };

//     console.log(friendRequests);
//     return (
//         <View style={{ padding: 10, marginHorizontal: 12 }}>
//             {friendRequests.length > 0 && <Text>Your Friend Requests!</Text>}
//         </View>
//     );
// };

// export default FriendsScreen;
// const styles = StyleSheet.create({});

    // const fetchFriendRequests = async () => {
    //     try {
    //         const response = await axios.get(
    //             `http://192.168.1.3:8000/friend-request/${userid}`
    //         );
    //         if (response.status === 200) {
    //             const friendRequestsData = response.data.map((friendRequest) => ({
    //                 _id: friendRequest._id,
    //                 name: friendRequest.name,
    //                 email: friendRequest.email,
    //             }));

    //             setFriendRequests(friendRequestsData);
    //         }
    //     } catch (err) {
    //         console.error("Error message", err); // Use console.error for errors
    //     }
    // };



import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { UserType } from "../UserContext";

const FriendsScreen = () => {
    const { userid} = useContext(UserType);
    const [friendRequests, setFriendRequests] = useState([]);
    
    useEffect(() => {
        fetchFriendRequests();
    }, []);

    const fetchFriendRequests = async () => {
        try {
            const response = await axios.get(
                `http://192.168.1.3:8000/friend-request/${userid}`
            );
            console.log("Server Response:", response.data); // Log the server response
            // ...
        } catch (err) {
            console.error("Error message", err);
        }
    };
    
    const fetchFriendRequests1 = async () => {
        try {
            const response = await axios.get(
                `http://192.168.1.3:8000/friend-request/${userid}`
            );
            if (response.status === 200 && Array.isArray(response.data)) {
                const friendRequestsData = response.data.map((friendRequest) => ({
                    _id: friendRequest._id,
                    name: friendRequest.name,
                    email: friendRequest.email,
                }));
    
                setFriendRequests(friendRequestsData);
            } else {
                console.error("Invalid response data:", response.data);
            }
        } catch (err) {
            console.error("Error message", err); // Use console.error for errors
        }
    };
    
    console.log(friendRequests);
    return (
        <View style={{ padding: 10, marginHorizontal: 12 }}>
            {friendRequests.length > 0 && <Text>Your Friend Requests!</Text>}
        </View>
    );
};

export default FriendsScreen;
const styles = StyleSheet.create({});

