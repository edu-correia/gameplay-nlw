import React, {useState, useEffect} from "react";
import { 
    View, 
    ImageBackground, 
    Text, 
    FlatList,
    Alert,
    Share,
    Platform
 } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import * as Linking from 'expo-linking';
import { Fontisto } from "@expo/vector-icons";

import { Background } from "../../components/Background";
import { Header } from "../../components/Header";
import { ListHeader } from "../../components/ListHeader";
import { ListDivider } from "../../components/ListDivider";
import { DataMemberProps, Member } from "../../components/Member";
import { ButtonIcon } from "../../components/ButtonIcon";

import BannerImg from '../../assets/banner.png';

import { theme } from "../../global/styles/theme";
import { styles } from "./styles";
import { useRoute } from "@react-navigation/native";
import { AppointmentProps } from "../../components/Appointment";
import { Loading } from "../../components/Loading";

import { api } from "../../services/api";

interface RouteParams{
    selectedGuild: AppointmentProps;
}

interface GuildWidget{
    id: string;
    name: string;
    instant_invite: string;
    members: DataMemberProps[];
}

export function AppointmentDetails() {
    const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
    const [loading, setLoading] = useState(true);

    const route = useRoute();
    const { selectedGuild } = route.params as RouteParams;

    async function fetchMembers(){
        try {
            const response = await api.get(`/guilds/${selectedGuild.guild.id}/widget.json`);

            setWidget(response.data);
        } catch (error) {
            Alert.alert('Verifique as configurações do servidor');
            setWidget({
                instant_invite: "",
                members: [],
                name: selectedGuild.guild.name,
                id: selectedGuild.guild.id
            });
        }finally{
            setLoading(false);
        }
    }

    function handleShareInvitation(){
        const message = Platform.OS === 'ios' 
        ? `Junte-se a ${selectedGuild.guild.name}`
        : widget.instant_invite

        console.log(widget.instant_invite);

        Share.share({
            message,
            url: widget.instant_invite
        })
    }

    function handleOpenGuild(){
        Linking.openURL(widget.instant_invite);
    }

    useEffect(() => {
        fetchMembers();
    }, []);

    return (
        <Background>
            <Header 
                title="Detalhes"
                action={
                    selectedGuild.guild.owner && 
                    <BorderlessButton
                        onPress={handleShareInvitation}
                    >
                        <Fontisto
                            name="share"
                            size={24}
                            color={theme.colors.primary}
                        />
                    </BorderlessButton>
                }
            />

            <ImageBackground 
                source={BannerImg}
                style={styles.banner}
            >
                <View style={styles.bannerContent}>
                    <Text style={styles.title}>
                        {selectedGuild.guild.name}
                    </Text>
                    <Text style={styles.subtitle}>
                        {selectedGuild.description}
                    </Text>
                </View>
            </ImageBackground>

            {
                loading ? (
                    <Loading />
                ) : (
                    <>
                        <ListHeader 
                            title="Jogadores"
                            subtitle={`Total: ${widget.members.length}`}
                        />
            
                        <FlatList 
                            data={widget.members}
                            keyExtractor={item => item.id}
                            renderItem={({item}) => (
                                <Member 
                                    data={item}
                                />
                            )}
                            ItemSeparatorComponent={() => <ListDivider />}
                            style={styles.members}
                        />
                    </>
                    )
                }

            {
                selectedGuild.guild.owner && 
                <View style={styles.footer}>
                    <ButtonIcon 
                        title="Entrar na partida"
                        onPress={handleOpenGuild}
                    />    
                </View>
            }
        </Background>
    )
}