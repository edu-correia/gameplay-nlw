import React, { useState, useCallback } from "react";
import { View, FlatList, Text } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Profile } from "../../components/Profile";
import { ButtonAdd } from "../../components/ButtonAdd";
import { CategorySelect } from "../../components/CategorySelect";
import { ListHeader } from "../../components/ListHeader";
import { Appointment, AppointmentProps } from "../../components/Appointment";
import { ListDivider } from "../../components/ListDivider";
import { Background } from '../../components/Background';
import { Loading } from '../../components/Loading';

import { COLLECTION_APPOINTMENTS } from "../../configs/database";

import { styles } from "./styles";

export function Home(){
    const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(true);

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

    useFocusEffect(useCallback(() => {
        loadAppointments();
    }, [category]));

    return (
        <Background>
                <View style={styles.header}>
                    <Profile />
                    <ButtonAdd 
                        onPress={handleAppointmentCreate} 
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
        </Background>
    )
}