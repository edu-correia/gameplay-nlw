import React, { ReactNode } from 'react';

import { 
    Modal, 
    View,
    ModalProps,
    TouchableWithoutFeedback,
    Dimensions
 } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Background } from '../Background';

import {styles} from './styles';  

interface ModalViewProps extends ModalProps{
    children: ReactNode;
    closeModal: () => void;
    height: number;
}

export function ModalView({children, closeModal, height, ...rest}: ModalViewProps){
    return (
        <Modal
            transparent
            statusBarTranslucent
            animationType="slide"
            {...rest}
        >
            <TouchableWithoutFeedback onPress={closeModal}>
                <View style={styles.overlay}>
                    <View style={[
                        styles.container,
                        {marginTop: Dimensions.get('window').height - height}
                    ]}>
                        <Background>
                            <View style={styles.bar} />
                                
                            {children}
                        </Background>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}