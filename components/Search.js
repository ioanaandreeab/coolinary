import React from 'react';
import { Input, Button, Layout } from '@ui-kitten/components';
import { View, Text, ScrollView } from 'react-native';
import RecipeCard from '../components/RecipeCard';
import Recipes from '../screens/Recipes';
import axios from 'axios';

const viewStyle = {
    padding:40
}

const inputStyle = { 
    width: '80%'
}

const layoutStyle = {
    flexDirection: "row"
}

const baseURL = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;

const Search = () => {
    const [ searchTerm, setSearchTerm] = React.useState('');
    const [ fetchedRecipes, setFetchedRecipes] = React.useState([]);
    const [ recipeCards, setRecipeCards] = React.useState([]);

    const triggerSearch = async () => {
        await axios.get(`${baseURL}${searchTerm}`).then(res => {
            setFetchedRecipes(res.data.meals);
        }).catch(err => console.log(err));
        getRecipeCards();
    }

    const getRecipeCards = () => {
        let recipes = [];
        for(let recipe of fetchedRecipes) {
            recipes.push(
                <RecipeCard 
                    key={recipe.idMeal} 
                    name={recipe.strMeal} 
                    photoUrl={recipe.strMealThumb}
                />
            );
        }
        setRecipeCards(recipes);
    } 

    return (
        <View style={viewStyle}>
            <Layout style={layoutStyle}>
                <Input
                    style={inputStyle}
                    placeholder='Search recipe..'
                    value={searchTerm}
                    onChangeText={nextValue => setSearchTerm(nextValue)}
                />
                <Button 
                    onPress={() => triggerSearch()}>
                    Search
                </Button>
            </Layout>
            <ScrollView>    
                {recipeCards}
            </ScrollView>
        </View>
    );
  };
export default Search;
