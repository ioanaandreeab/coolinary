import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View } from 'react-native';
import { withNavigation } from 'react-navigation';

import axios from 'axios';
import { Divider, Layout } from '@ui-kitten/components';
import RecipeCard from '../components/RecipeCard'

const Recipes = ({ route, navigation }) => {
    const category = navigation.state.params.params.categoryName;
    const [recipes, setRecipes] = useState([])
    useEffect(() => {
        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
            .then(res => {
                setRecipes(res.data.meals)
            })
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Divider />
            <ScrollView>
                <View>
                    <Layout style={styles.topContainer}>
                        {recipes && recipes.map(item => <RecipeCard key={item.idMeal} id={item.idMeal} name={item.strMeal} photoUrl={item.strMealThumb} />)}
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
    },
    card: {
        flex: 1,
        margin: 2,
    }
});
export default withNavigation(Recipes);