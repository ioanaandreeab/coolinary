import React, { useEffect } from 'react';
import { Layout } from '@ui-kitten/components';
import Search from '../components/Search';
import RecipeCard from '../components/RecipeCard';
import axios from 'axios';

const randomRecipeURL = `https://www.themealdb.com/api/json/v1/1/random.php`;
const layoutStyle = {
  flex: 1, 
  alignItems: 'center', 
  justifyContent: 'flex-start',
  marginTop: 50
}

const Home = () => { 
  const [randomRecipe, setRecipe] = React.useState({});
  
  useEffect(()=> {
    axios.get(randomRecipeURL).then(res => {
      setRecipe(res.data.meals[0]);
    });
  }, []);

  return(
    <Layout style={layoutStyle}>
      <RecipeCard key={randomRecipe.idMeal} name={randomRecipe.strMeal} photoUrl={randomRecipe.strMealThumb}/>
      <Search/>   
    </Layout>
  );
}

export default Home;