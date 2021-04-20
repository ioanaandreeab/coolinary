import React from 'react';
import { Text, Layout } from '@ui-kitten/components';
import Search from '../components/Search';
import RecipeCard from '../components/RecipeCard';
import axios from 'axios';

const randomRecipeURL = `https://www.themealdb.com/api/json/v1/1/random.php`;
const getRandomRecipe = () => {
  componentDidMount() {
    axios.get(randomRecipeURL).then(recipe => {
       
    })
  }
  return;
}

const Home = () => {
  let randomRecipe = getRandomRecipe();

  return(
    <Layout style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <RecipeCard recipe = {randomRecipe} />
      <Search/>   
    </Layout>
  );
}

export default Home;