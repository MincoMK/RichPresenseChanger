import {StyleSheet} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import {Text, View} from '../components/Themed';
import {RootTabScreenProps} from '../types';
import ColoredButton from "../components/ColoredButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useState} from "react";

export default function HomeScreen({navigation}: RootTabScreenProps<'Home'>) {
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    async function onPress(name: string) {
        const token = await AsyncStorage.getItem('token') || "Token unset.";
        const message = await AsyncStorage.getItem(`${name}Message`) || "Message unset.";

        const res = await fetch('https://discord.com/api/v10/users/@me/settings', {
            method: 'PATCH',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status: "online",
                custom_status: {
                    text: message
                }
            })
        });
        if (res.status == 200) {
            setSuccess("Successed!");
            setError("");
        }
        else {
            setError("Failed! " + res.status + " " + res.statusText);
            setSuccess("");
        }
        setTimeout(() => {
            setSuccess("");
            setError("");
        }, 1000);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.success}>{success}</Text>
            <Text style={styles.error}>{error}</Text>
            <View style={styles.buttons}>
                <ColoredButton color="green" name="green" onPress={onPress}/>
                <ColoredButton color="yellow" name="yellow" onPress={onPress}/>
                <ColoredButton color="red" name="red" onPress={onPress}/>
                <ColoredButton color="gray" name="gray" onPress={onPress}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    buttons: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        gap: 10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    success: {
        color: "green"
    },
    error: {
        color: "red"
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
