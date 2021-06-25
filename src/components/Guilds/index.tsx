import React from "react";
import {View, FlatList} from "react-native";

import { Guild, GuildDataProps } from "../Guild";
import { ListDivider } from "../ListDivider";

import { styles } from './styles'

interface GuildsProps{
    handleGuildSelect: (guild: GuildDataProps) => void;
}

export function Guilds({handleGuildSelect}: GuildsProps){
    const guilds = [
        {
            id: "1",
            icon: 'image.png',
            name: "Lendários",
            owner: true
        }
    ];

    return(
        <View style={styles.container}>
            <FlatList 
                data={guilds}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <Guild 
                        data={item}
                        onPress={() => handleGuildSelect(item)}
                    />
                )}
                ItemSeparatorComponent={() => <ListDivider />}
                showsVerticalScrollIndicator={false}
                style={styles.guilds}
            />
        </View>
    )
}