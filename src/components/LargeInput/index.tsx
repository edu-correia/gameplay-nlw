import React from "react";

import { TextInput, TextInputProps, Text, View } from "react-native";
import { styles } from "./styles";

interface LargeInputProps extends TextInputProps{
    label: string
}

export function LargeInput({label, ...rest}: LargeInputProps){
    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                {label}
            </Text>
            <TextInput 
                style={styles.input}
                {...rest}
            />
        </View>
    )
}