import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View } from 'react-native';
import { withNavigation } from 'react-navigation';

import axios from 'axios';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import RecipeCard from '../components/RecipeCard'
const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' />
);

const Recipes = ({ route, categoryName, navigation, ...props }) => {
    console.log('rec', route)
    const [recipes, setRecipes] = useState([])
    useEffect(() => {
        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood`)
            .then(res => {
                setRecipes(res.data.meals)
            })
    }, [])
    const navigateBack = () => {
        // console.log('recipes')
        //not working: navigation.goBack()
        navigation.navigate('Categories');
    };

    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={() => navigateBack()} />
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavigation style={styles.topNavigation} title='Retete' alignment='center' accessoryLeft={BackAction} />
            <Divider />
            <ScrollView>
                <View>
                    <Layout style={styles.topContainer}>
                        {recipes.map(item => <RecipeCard key={item.idMeal} name={item.strMeal} photoUrl={item.strMealThumb} />)}
                    </Layout>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    topNavigation: {
        marginTop: '5%'
    },
    topContainer: {
        flex: 1,
        paddingHorizontal: 8,
        justifyContent: 'center',
        marginTop: '5%'
    },
    card: {
        flex: 1,
        margin: 2,
    }
});
export default withNavigation(Recipes);