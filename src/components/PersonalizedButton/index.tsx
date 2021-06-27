import React from "react";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { styles } from "./styles";
import { theme } from "../../global/styles/theme";

interface PersonalizedButtonProps extends RectButtonProps{
    iconName: any;
    borderRadius: number;
}

export function PersonalizedButton({iconName, borderRadius, ...rest}: PersonalizedButtonProps){
    return (
        <RectButton
            style={[
                styles.container,
                {borderRadius}
            ]}
            {...rest}
        >
            <MaterialCommunityIcons 
                name={iconName}
                color={theme.colors.heading}
                size={24}
            />
        </RectButton>
    )
}