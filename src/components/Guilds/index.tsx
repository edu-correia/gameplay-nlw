import React, { useState } from "react";
import {View, FlatList} from "react-native";

import { Guild, GuildDataProps } from "../Guild";
import { Loading } from "../Loading";
import { ListDivider } from "../ListDivider";

import { styles } from './styles'
import { api } from "../../services/api";
import { useEffect } from "react";

interface GuildsProps{
    handleGuildSelect: (guild: GuildDataProps) => void;
}

export function Guilds({handleGuildSelect}: GuildsProps){
    const [guilds, setGuilds] = useState<GuildDataProps[]>([]);
    const [loading, setLoading] = useState(true);

    async function fecthGuilds(){
        const response = await api.get('/users/@me/guilds');
        setGuilds(response.data);
        setLoading(false);
    }

    useEffect(() => {
        fecthGuilds();
    }, []);

    return(
        <View style={styles.container}>

            {
                loading ? (
                    <Loading />
                ) : (
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
                        contentContainerStyle={{paddingBottom: 30}}
                        style={styles.guilds}
                    />
                )
            }
        </View>
    )
}