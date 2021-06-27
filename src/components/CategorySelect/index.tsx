import React, { useState, useEffect } from "react";
import { 
    ScrollView
} from "react-native";
import {
    RectButton, RectButtonProps
} from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SvgProps } from "react-native-svg";

import { categories } from "../../utils/categories";
import { Category } from "../Category";

import { styles } from './styles';
import { COLLECTION_CATEGORIES } from "../../configs/database";

interface CategorySelectProps{
    categorySelected: string;
    setCategory: (categoryId: string) => void;
    hasCheckBox?: boolean;
}

interface Category{
    id: string;
    title: string;
    icon: React.FC<SvgProps> | string;
    checked?: boolean;
    hasCheckBox?: boolean;
    enabledCategory?: boolean;
}

export function CategorySelect({ 
    categorySelected, 
    setCategory, 
    hasCheckBox = false 
}: CategorySelectProps){
    const [categoriesList, setCategoriesList] = useState<Category[]>(categories);

    const navigation = useNavigation();

    function handleCategoryCreate(){
        navigation.navigate('CategoryCreate');
    }

    async function loadCategories(){
        const storage = await AsyncStorage.getItem(COLLECTION_CATEGORIES);
        
        const previousCategories: Category[] = storage ? JSON.parse(storage) : [];
        
        setCategoriesList([...categories, ...previousCategories]);
    }
    
    useEffect(() => {
        loadCategories();
    }, []);

    return (
        <ScrollView 
            horizontal
            style={styles.container}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingRight: 40}}
        >
            {categoriesList.map(category => (
                <Category
                    key={category.id}
                    title={category.title}
                    icon={category.icon}
                    checked={category.id === categorySelected}
                    onPress={() => { category.enabledCategory 
                        ? setCategory(category.id) 
                        : handleCategoryCreate()
                    }} 
                    hasCheckBox={hasCheckBox}
                    enabledCategory={category.enabledCategory}
                />
            ))}
        </ScrollView>
    )
}