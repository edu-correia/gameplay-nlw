import React from "react";
import {
    TouchableOpacity, 
    TouchableOpacityProps,
    View,
    Text
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { GuildIcon } from "../GuildIcon";

import { styles } from './styles'
import { theme } from "../../global/styles/theme";

export interface GuildDataProps{
    id: string;
    name: string;
    icon: string | null;
    owner: boolean;
}

interface GuildProps extends TouchableOpacityProps{
    data: GuildDataProps;
}

export function Guild({data, ...rest}: GuildProps){
    return(
        <TouchableOpacity 
            style={styles.container}
            activeOpacity={0.7}
            {...rest}
        >
            <GuildIcon 
                guildId={data.id}
                iconId={data.icon}
            />

            <View style={styles.content}>
                <View>
                    <Text style={styles.title}>
                        {data.name}
                    </Text>

                    <Text style={styles.type}>
                        {data.owner ? "Administrador" : "Convidado"}
                    </Text>
                </View>
            </View>

            <Feather 
                name="chevron-right"
                color={theme.colors.heading}
                size={24}
            />
        </TouchableOpacity>
    )
}