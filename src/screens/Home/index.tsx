import React, { useState, useCallback } from "react";
import { View, FlatList, Text, Alert, TouchableOpacity } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Profile } from "../../components/Profile";
import { PersonalizedButton } from "../../components/PersonalizedButton";
import { CategorySelect } from "../../components/CategorySelect";
import { ListHeader } from "../../components/ListHeader";
import { Appointment, AppointmentProps } from "../../components/Appointment";
import { ListDivider } from "../../components/ListDivider";
import { Background } from '../../components/Background';
import { Loading } from '../../components/Loading';
import { ModalView } from "../../components/ModalView";

import { useAuth } from "../../hooks/auth";

import { COLLECTION_APPOINTMENTS } from "../../configs/database";

import { styles } from "./styles";
import { theme } from "../../global/styles/theme";

export function Home(){
    const {signOut} = useAuth();
    const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const [isSettingsOpen, setIsSettingsOpen] = useState(true);

    const navigation = useNavigation();

    function handleCategorySelect(categoryId: string){
        categoryId === category ? setCategory('') : setCategory(categoryId)
    }

    function handleAppointmentDetails(selectedGuild: AppointmentProps){
        navigation.navigate('AppointmentDetails', {selectedGuild});
    }

    function handleAppointmentCreate(){
        navigation.navigate('AppointmentCreate');
    }

    async function loadAppointments() {
        const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);

        const previousAppointments: AppointmentProps[] = storage ? JSON.parse(storage) : [];

        if(category){
            setAppointments(previousAppointments.filter(item => item.category === category));
        }else{
            setAppointments(previousAppointments);  
        }

        setLoading(false);

        console.log(previousAppointments);
    }

    function handleToggleSettings(){
        setIsSettingsOpen(!isSettingsOpen);
    }

    async function handleDeleteAllAppointments(){
        Alert.alert(
            'Excluir partidas', 
            'Tem certeza que deseja apagar todos agendamentos?', 
            [
                {
                    text: 'Não',
                    style: "cancel"
                },
                {
                    text: 'Sim',
                    onPress: async () => {
                        await AsyncStorage.removeItem(COLLECTION_APPOINTMENTS);
                    }
                }
            ]
        );

    }

    function handleSignOut(){
        Alert.alert(
            'Logout', 
            'Deseja sair do GamePlay?', 
            [
                {
                    text: 'Não',
                    style: "cancel"
                },
                {
                    text: 'Sim',
                    onPress: () => signOut()
                }
            ]
        );
    }

    useFocusEffect(useCallback(() => {
        loadAppointments();
    }, [category]));

    return (
        <Background>
                <View style={styles.header}>
                    <Profile />
                    <PersonalizedButton 
                        onPress={handleToggleSettings} 
                        borderRadius={50}
                        iconName="cog"
                    />
                </View>

                    <CategorySelect 
                        categorySelected={category}
                        setCategory={handleCategorySelect}
                    />

                    {
                        loading ? (
                            <Loading />
                        ) : (
                            <>
                                <ListHeader 
                                    title="Partidas agendadas"
                                    subtitle={`Total: ${appointments.length}`}
                                />

                                <FlatList 
                                    data={appointments}
                                    keyExtractor={item => item.id}
                                    renderItem={({item}) => (
                                        <Appointment 
                                            data={item}
                                            onPress={() => handleAppointmentDetails(item)}
                                        />
                                    )}
                                    style={styles.matches}
                                    contentContainerStyle={{paddingBottom: 30}}
                                    showsVerticalScrollIndicator={false}
                                    ItemSeparatorComponent={() => <ListDivider />}
                                />
                            </>
                        )
                    }

                    <View style={styles.addButton}>
                        <PersonalizedButton 
                            onPress={handleAppointmentCreate} 
                            borderRadius={8}
                            iconName="plus"
                        />
                    </View>

                    <ModalView 
                        visible={isSettingsOpen} 
                        closeModal={handleToggleSettings}
                        height={200}
                    >
                        <TouchableOpacity 
                            style={styles.settingsBtn} 
                            onPress={handleDeleteAllAppointments}
                        >
                            <Text style={styles.settingsBtnText}>
                                Limpar partidas
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.settingsBtn} 
                            onPress={handleSignOut}
                        >
                            <Text style={[styles.settingsBtnText, {color: theme.colors.primary}]}>
                                Sair
                            </Text>
                        </TouchableOpacity>
                    </ModalView>
        </Background>
    )
}