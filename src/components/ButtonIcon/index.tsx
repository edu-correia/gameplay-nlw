import React from "react";
import { 
    Text,
    Image,
    View,
    TouchableOpacity,
    TouchableOpacityProps
} from "react-native";

import DiscordImg from '../../assets/discord.png';

import { styles } from "./styles";

interface ButtonProps extends TouchableOpacityProps{
    title: string;
}

export function ButtonIcon({title, ...rest}: ButtonProps){
    return (
        <TouchableOpacity style={styles.container} activeOpacity={rest.activeOpacity}>
            <View style={styles.iconWrapper}>
                <Image source={DiscordImg} style={styles.icon} />
            </View>

            <Text style={styles.title}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}