import React from 'react';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { View, Text, Image } from 'react-native';
import { SvgProps } from 'react-native-svg'
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../global/styles/theme';

import { styles } from './styles';

interface CategoryProps extends RectButtonProps{
    title: string;
    icon: React.FC<SvgProps> | string;
    checked?: boolean;
    hasCheckBox?: boolean;
    enabledCategory?: boolean;
}

export function Category({
    title, 
    icon: Icon, 
    checked = false, 
    hasCheckBox = false,
    enabledCategory = true,
    ...rest
}: CategoryProps){
    const {secondary40, secondary50, secondary70, secondary75} = theme.colors;

    if(!enabledCategory && !hasCheckBox){
        return (
            <></>
        )
    }

    return (
        <RectButton {...rest}>
            <LinearGradient
                style={styles.container}
                colors={[secondary50, secondary70]}
            >
                <LinearGradient 
                    style={[styles.content, {opacity: checked ? 1 : 0.5 }]}
                    colors={[checked ? secondary75 :  secondary50, secondary40]}
                >
                    {
                        hasCheckBox && enabledCategory && (
                            <View style={ checked ? styles.checked : styles.unchecked } />
                        )
                    }

                    {
                        typeof Icon === 'string' ? (
                            <Image 
                                source={{uri: Icon}}
                                style={styles.image}
                            />
                        ) : (
                            <Icon 
                                width={48}
                                height={48}
                            />
                        ) 
                    }

                    <Text style={styles.title}>
                        {title}
                    </Text>
                </LinearGradient>
            </LinearGradient>
        </RectButton>
    );
}