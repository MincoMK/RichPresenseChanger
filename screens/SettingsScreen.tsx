import {StyleSheet} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import {Text, View} from '../components/Themed';
import Input from "../components/Input";
import useForm from "../hooks/useForm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect} from "react";


export default function SettingsScreen() {
    const [formData, handleChangeText, initialData] = useForm(async data => {
        await AsyncStorage.setItem('token', data.token || '');
        await AsyncStorage.setItem('greenMessage', data.greenMessage || '');
        await AsyncStorage.setItem('yellowMessage', data.yellowMessage || '');
        await AsyncStorage.setItem('redMessage', data.redMessage || '');
        await AsyncStorage.setItem('grayMessage', data.grayMessage || '');
    }, async () => ({
        token: await AsyncStorage.getItem('token') || '',
        greenMessage: await AsyncStorage.getItem('greenMessage') || '',
        yellowMessage: await AsyncStorage.getItem('yellowMessage') || '',
        redMessage: await AsyncStorage.getItem('redMessage') || '',
        grayMessage: await AsyncStorage.getItem('grayMessage') || '',
    }));

    return (
        <View style={styles.container}>
            <Input type="text" label="TOKEN" onChangeText={handleChangeText} value={initialData.token} name="token" />
            <Input type="text" label="GREEN MESSAGE" onChangeText={handleChangeText} value={initialData.greenMessage} name="greenMessage" />
            <Input type="text" label="YELLOW MESSAGE" onChangeText={handleChangeText} value={initialData.yellowMessage} name="yellowMessage" />
            <Input type="text" label="RED MESSAGE" onChangeText={handleChangeText} value={initialData.redMessage} name="redMessage" />
            <Input type="text" label="GRAY MESSAGE" onChangeText={handleChangeText} value={initialData.grayMessage} name="grayMessage" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        padding: 25
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
