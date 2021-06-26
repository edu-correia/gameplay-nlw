import React, { useState } from "react";
import { 
    View, 
    Text,
    KeyboardAvoidingView,
    ScrollView,
    Platform
} from "react-native";
import { RectButton } from "react-native-gesture-handler"; 
import uuid from 'react-native-uuid';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

import { COLLECTION_APPOINTMENTS } from "../../configs/database";

import { ModalView } from "../../components/ModalView";
import { Header } from "../../components/Header";
import { CategorySelect } from "../../components/CategorySelect";
import { GuildIcon } from "../../components/GuildIcon";
import { SmallInput } from "../../components/SmallInput";
import { TextArea } from "../../components/TextArea";
import { Button } from "../../components/Button";

import { theme } from "../../global/styles/theme";
import { styles } from "./styles";
import { Guilds } from "../../components/Guilds";
import { Guild, GuildDataProps } from "../../components/Guild";
import { Background } from "../../components/Background";

export function AppointmentCreate() {
    const [category, setCategory] = useState('');
    const [isGuildsModalOpen, setIsGuildsModalOpen] = useState(false);
    const [selectedGuild, setSelectedGuild] = useState<GuildDataProps>({} as GuildDataProps);

    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');
    const [description, setDescription] = useState('');

    const navigation = useNavigation();

    function handleCategorySelect(categoryId: string){
        setCategory(categoryId)
    }

    function handleToggleModal(){
        setIsGuildsModalOpen(!isGuildsModalOpen);
    }

    function handleGuildSelected(guildSelect: GuildDataProps){
        setSelectedGuild(guildSelect);
        setIsGuildsModalOpen(false);
    }

    async function handleSaveAppointment(){
        const newAppointment = {
            id: uuid.v4(),
            guild: selectedGuild,
            category,
            description,
            date: `${day}/${month} às ${hour}:${minute}h`
        };

        const previousAppointments = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);

        const appointments = previousAppointments ? JSON.parse(previousAppointments) : [];

        await AsyncStorage.setItem(
            COLLECTION_APPOINTMENTS,
            JSON.stringify([...appointments, newAppointment])
        );

        navigation.navigate("Home");
    }

    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <Background>
                <ScrollView>
                    <Header 
                        title="Agendar partida"
                    />

                    <Text style={[
                        styles.label, 
                        {marginLeft: 24, marginTop: 24, marginBottom: 18}]
                    }>
                        Categoria
                    </Text>

                    <CategorySelect 
                        hasCheckBox
                        setCategory={handleCategorySelect}
                        categorySelected={category}
                    />

                    <View style={styles.form}>
                        <RectButton onPress={handleToggleModal}>
                            <View style={styles.select}>
                                {
                                    selectedGuild.icon ? (
                                        <GuildIcon 
                                            guildId={selectedGuild.id}
                                            iconId={selectedGuild.icon}
                                        /> 
                                    ) : (
                                        <View 
                                            style={styles.image}
                                        /> 
                                    )
                                }

                                <View style={styles.selectBody}>
                                    <Text style={styles.label}>
                                        {selectedGuild.name ? selectedGuild.name : "Selecione um servidor"}
                                    </Text>
                                </View>

                                <Feather 
                                    name="chevron-right"
                                    color={theme.colors.heading}
                                    size={18}
                                />
                            </View>
                        </RectButton>
                        
                        <View style={styles.field}>
                            <View>
                                <Text style={[styles.label, { marginBottom: 12 }]}>
                                    Dia e mês
                                </Text>

                                <View style={styles.column}>
                                    <SmallInput 
                                        maxLength={2} 
                                        onChangeText={setDay}    
                                    />
                                    <Text style={styles.divider}>
                                        /
                                    </Text>
                                    <SmallInput 
                                        maxLength={2} 
                                        onChangeText={setMonth}    
                                    />
                                </View>
                            </View>

                            <View>
                                <Text style={[styles.label, { marginBottom: 12 }]}>
                                    Horário
                                </Text>
                                
                                <View style={styles.column}>
                                    <SmallInput 
                                        maxLength={2} 
                                        onChangeText={setHour}    
                                    />
                                    <Text style={styles.divider}>
                                        :
                                    </Text>
                                    <SmallInput 
                                        maxLength={2} 
                                        onChangeText={setMinute}    
                                    />
                                </View>
                            </View>
                        </View>
                    
                        <View style={[styles.field, { marginBottom: 12 }]}>
                            <Text style={styles.label}>
                                Descrição
                            </Text>

                            <Text style={styles.charactersLimit}>
                                100 caracteres
                            </Text>
                        </View>

                        <TextArea 
                            multiline
                            maxLength={100}
                            numberOfLines={5}
                            autoCorrect={false}
                            onChangeText={setDescription}    
                        />

                        <View style={styles.footer}>
                            <Button 
                                title="Agendar"
                                onPress={handleSaveAppointment}
                            />
                        </View>
                    </View>
                </ScrollView>
            </Background>

            <ModalView visible={isGuildsModalOpen} closeModal={handleToggleModal}>
                <Guilds 
                    handleGuildSelect={handleGuildSelected}
                />
            </ModalView>
        </KeyboardAvoidingView>
    )
}