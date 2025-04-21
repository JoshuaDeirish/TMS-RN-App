import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native"; // Added missing imports

const TestPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/users/");
            const data = await response.json();
            setUsers(data);
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <SafeAreaView>
            {users.map((user) => (
                <View key={user.id}>
                    <Text>{user.firstName}</Text>
                </View>
            ))}
        </SafeAreaView>
    )
}

export default TestPage;