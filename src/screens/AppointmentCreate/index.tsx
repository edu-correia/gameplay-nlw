import React, { useState } from "react";
import { 
    View, 
    Text,
    KeyboardAvoidingView,
    ScrollView,
    Platform
 } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

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

export function AppointmentCreate() {
    const [category, setCategory] = useState('');
    const [isGuildsModalOpen, setIsGuildsModalOpen] = useState(false);
    const [selectedGuild, setSelectedGuild] = useState<GuildDataProps>({} as GuildDataProps);

    function handleOpenGuildsModal(){
        setIsGuildsModalOpen(true);
    }

    function handleGuildSelected(guildSelect: GuildDataProps){
        setSelectedGuild(guildSelect);
        setIsGuildsModalOpen(false);
    }

    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
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
                    setCategory={setCategory}
                    categorySelected={category}
                />

                <View style={styles.form}>
                    <RectButton onPress={handleOpenGuildsModal}>
                        <View style={styles.select}>
                            {
                                selectedGuild.icon ? (
                                    <GuildIcon /> 
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
                            <Text style={styles.label}>
                                Dia e mês
                            </Text>

                            <View style={styles.column}>
                                <SmallInput maxLength={2} />
                                <Text style={styles.divider}>
                                    /
                                </Text>
                                <SmallInput maxLength={2} />
                            </View>
                        </View>

                        <View>
                            <Text style={styles.label}>
                                Horário
                            </Text>
                            
                            <View style={styles.column}>
                                <SmallInput maxLength={2} />
                                <Text style={styles.divider}>
                                    :
                                </Text>
                                <SmallInput maxLength={2} />
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
                    />

                    <View style={styles.footer}>
                        <Button 
                            title="Agendar"
                        />
                    </View>
                </View>
            </ScrollView>

            <ModalView visible={isGuildsModalOpen}>
                <Guilds 
                    handleGuildSelect={handleGuildSelected}
                />
            </ModalView>
        </KeyboardAvoidingView>
    )
}