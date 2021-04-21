import React from 'react';
import { Input, Button, Layout } from '@ui-kitten/components';
import { View, Text, ScrollView } from 'react-native';
import RecipeCard from '../components/RecipeCard';
import axios from 'axios';

const inputStyle = { 
    width: '80%'
}

const baseURL = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;

const Search = () => {
    const [ searchTerm, setSearchTerm] = React.useState('');
    const [ fetchedRecipes, setFetchedRecipes] = React.useState([]);
    const recipeCards = [];

    const triggerSearch = async () => {
        await axios.get(`${baseURL}${searchTerm}`).then(res => {
            setFetchedRecipes(res.data.meals);
        }).catch(err => console.log(err));
        getRecipeCards();
    }

    const getRecipeCards = () => {
        for(let recipe in fetchedRecipes) {
            console.log(recipe)
            recipeCards.push(
                <RecipeCard 
                    key={recipe.idMeal} 
                    name={recipe.strMeal} 
                    photoUrl={recipe.strMealThumb}
                />
            );
        }
    } 

    return (
        <View>
            <Layout style={{flexDirection: "row", padding:20}}>
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
