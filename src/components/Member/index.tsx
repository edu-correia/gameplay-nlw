import React from "react";
import { View, Text } from "react-native";
import { theme } from "../../global/styles/theme";

import { Avatar } from "../Avatar";

import { styles } from './styles';

export interface DataMemberProps{
    id: string;
    username: string;
    avatar_url: string;
    status: string;
}

interface MemberProps{
    data: DataMemberProps;
}

export function Member({data}: MemberProps){
    const isOnline = data.status === 'online';
    const {primary, on} = theme.colors;

    return (
        <View style={styles.container}>
            <Avatar 
                urlImage={data.avatar_url}
            />

            <View>
                <Text style={styles.title}>
                    {data.username}
                </Text>

                <View style={styles.status}>
                    <View style={[
                        styles.bulletStatus,
                        {backgroundColor: isOnline ? on : primary} ]} 
                    />

                    <Text style={styles.nameStatus}>
                        {isOnline ? 'Disponível' : 'Ocupado'}
                    </Text>

                </View>
            </View>
        </View>
    )
}