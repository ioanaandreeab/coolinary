import React from 'react';
import { Input, Button, Layout } from '@ui-kitten/components';
import { View, Text, ScrollView } from 'react-native';
import RecipeCard from '../components/RecipeCard';
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
    // const [ fetchedRecipes, setFetchedRecipes] = React.useState([]);
    const [ recipeCards, setRecipeCards] = React.useState([]);

    const triggerSearch = async () => {
        await axios.get(`${baseURL}${searchTerm}`)
        .then(res => {
            // setFetchedRecipes(res.data.meals);
            getRecipeCards(res.data.meals);
        })
        .catch(err => console.log(err));
    }

    const getRecipeCards = (fetchedRecipes) => {
        let recipes = [];
        if(!fetchedRecipes || fetchedRecipes.length <=0) {
            setRecipeCards(<Text>No recipe found. Try other keywords.</Text>);
            return;
        }
        for(let recipe of fetchedRecipes) {
            recipes.push(
                <RecipeCard 
                    key={recipe.idMeal}
                    id={recipe.idMeal} 
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
