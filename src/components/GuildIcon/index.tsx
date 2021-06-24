import React from "react";
import { Image } from "react-native";

import { styles } from "./styles";

export function GuildIcon(){
    return (
        <Image 
            source={{uri: 'http://beeimg.com/images/p55408786611.png' }}
            style={styles.image}
            resizeMode="cover"
        />
    )
}