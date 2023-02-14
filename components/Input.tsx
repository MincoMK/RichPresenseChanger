import {Animated, NativeSyntheticEvent, StyleSheet, TextInput, TextInputFocusEventData} from "react-native";
import View = Animated.View;
import {Text} from '../components/Themed';
import {SyntheticEvent, useEffect, useRef, useState} from "react";
import {useThemeColor} from "./Themed";


interface InputProps {
    label?: string,
    placeholder?: string,
    type?: string,
    value?: string,
    style?: any,
    onChangeText?: any,
    name?: string,
}

export default function Input(props: InputProps) {
    const styles = StyleSheet.create({
        container: {
            marginBottom: 10
        },
        input: {
            width: '100%',
            height: '100%',
            color: useThemeColor({light: 'black', dark: 'white'}, 'text'),
            display: 'flex',
            alignItems: 'center',
            padding: 10,
            fontSize: 32,
        },
        wrap: {
            width: '100%',
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 5,
            height: 50,
        },
        label: {
            fontWeight: '900'
        }
    })

    const [text, setText] = useState("");

    function onChangeText(event: NativeSyntheticEvent<TextInputFocusEventData>) {
        setText(event.nativeEvent.text);
    }

    useEffect(() => {
        props?.onChangeText?.(props.name || "def", text);
    }, [text]);

    return (
        <View style={[props.style, styles.container]}>
            <Text style={styles.label}>{props.label}</Text>
            <View style={[styles.wrap]}>
                <TextInput style={styles.input} placeholder={props.placeholder} returnKeyType="done" autoComplete="off" onBlur={onChangeText} defaultValue={props.value} />
            </View>
        </View>
    );
}