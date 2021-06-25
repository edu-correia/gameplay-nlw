import React, { useState } from "react";
import { View, FlatList, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Profile } from "../../components/Profile";
import { ButtonAdd } from "../../components/ButtonAdd";
import { CategorySelect } from "../../components/CategorySelect";
import { ListHeader } from "../../components/ListHeader";
import { Appointment } from "../../components/Appointment";
import { ListDivider } from "../../components/ListDivider";
import { Background } from '../../components/Background';

import { styles } from "./styles";

export function Home(){
    const [category, setCategory] = useState('');

    const navigation = useNavigation();

    function handleCategorySelect(categoryId: string){
        categoryId === category ? setCategory('') : setCategory(categoryId)
    }

    function handleAppointmentDetails(){
        navigation.navigate('AppointmentDetails');
    }

    const appointments = [
        {
            id: '1',
            guild: {
                id: '1',
                name: 'Lendários',
                icon: null,
                owner: true
            },
            category: '1',
            date: '22/06 às 20:40h',
            description: 'Descrição'
        },
        {
            id: '2',
            guild: {
                id: '1',
                name: 'Lendários',
                icon: null,
                owner: false
            },
            category: '1',
            date: '22/06 às 20:40h',
            description: 'Descrição'
        }
    ];

    return (
        <Background>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Profile />
                    <ButtonAdd />
                </View>

                <View>
                    <CategorySelect 
                        categorySelected={category}
                        setCategory={handleCategorySelect}
                    />

                    <View style={styles.content}>
                        <ListHeader 
                            title="Partidas agendadas"
                            subtitle="Total: 6"
                        />

                        <FlatList 
                            data={appointments}
                            keyExtractor={item => item.id}
                            renderItem={({item}) => (
                                <Appointment 
                                    data={item}
                                    onPress={handleAppointmentDetails}
                                />
                            )}
                            style={styles.matches}
                            showsVerticalScrollIndicator={false}
                            ItemSeparatorComponent={() => <ListDivider />}
                        />
                    </View>
                </View>
            </View>
        </Background>
    )
}