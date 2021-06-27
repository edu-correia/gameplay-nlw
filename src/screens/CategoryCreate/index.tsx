import React, { useState } from 'react';

import {
	View
} from 'react-native';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';

import { Background } from '../../components/Background';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { LargeInput } from '../../components/LargeInput';

import { COLLECTION_CATEGORIES } from '../../configs/database';

import { styles } from './styles';

export function CategoryCreate(){
	const [name, setName] = useState('');
	const [icon, setIcon] = useState('');

	const navigation = useNavigation();

	async function handleSaveCategory(){
		const newCategory = {
			id: uuid.v4(),
			title: name,
			icon,
			enabledCategory: true
		};

		const previousCategories = await AsyncStorage.getItem(COLLECTION_CATEGORIES);

		const categories = previousCategories ? JSON.parse(previousCategories) : [];

		await AsyncStorage.setItem(
			COLLECTION_CATEGORIES,
			JSON.stringify([...categories, newCategory])
		);

		navigation.navigate("AppointmentCreate");
	}

	return (
		<Background>
			<Header 
				title="Criar categoria personalizada"
			/>

			<View style={styles.container}>
			<LargeInput 
				label="Nome da categoria:"
				onChangeText={setName}
			/>

			<LargeInput 
				label="Link do ícone:"
				onChangeText={setIcon}
			/>

			<Button 
				title="Criar categoria"
				onPress={handleSaveCategory}
			/>
			</View>
		</Background>
	);
}