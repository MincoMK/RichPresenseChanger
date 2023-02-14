import {Button, Pressable, StyleSheet, TouchableOpacity} from "react-native";

interface ColoredButtonProps {
    color: string;
    name?: string;
    onPress?: (name: string) => any;
}

export default function ColoredButton(props: ColoredButtonProps) {
    const styles = StyleSheet.create({
        btn: {
            backgroundColor: props.color,
            width: 70,
            height: 70,
            borderRadius: 25,
            '&:hover': {
                backgroundColor: `darken(${props.color}, 10%)`
            }
        }
    });

    return (
// circular button with single color, diameter: 50px
        <TouchableOpacity
            accessible={true}
            activeOpacity={0.5}
            onPress={() => {{}}}
            style={styles.btn}
            onPressOut={() => props?.onPress?.(props.name || "")}
         />
    );
}