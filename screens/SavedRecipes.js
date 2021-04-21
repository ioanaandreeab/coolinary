import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View } from 'react-native'
import { Text, Layout, Divider } from '@ui-kitten/components';
import axios from 'axios';
import _, { get } from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RecipeCard from '../components/RecipeCard'

const SavedRecipes = () => {
  const [recipes, setRecipes] = useState([])
  const getAllRecipes = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      keys.filter((key) => !_.isNil(key)).forEach(key => {
        if (key !== 'undefined' || _.isNil(key)) {
          getMeal(key)
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  const getMeal = (id) => {
    const urlToFetch = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`

    axios.get(urlToFetch).then(res => {
      const mealResp = res.data.meals[0];
      setRecipes(prev => [...prev, { idMeal: mealResp.id, strMeal: mealResp.strMeal, strMealThumb: mealResp.strMealThumb }])
    });
  }

  useEffect(() => {
    setRecipes([])
    getAllRecipes();
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Divider />
      <ScrollView stickyHeaderIndices={[0]} >
        <Text style={styles.headerNav} category="h5">Saved Recipes</Text>
        <View>
          <Layout style={styles.topContainer}>
            {recipes && recipes.map(item => <RecipeCard key={_.uniqueId()} id={item.idMeal} name={item.strMeal} photoUrl={item.strMealThumb} />)}
          </Layout >
        </View>
      </ScrollView>
    </SafeAreaView >
  )
}
const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    paddingHorizontal: 8,
    justifyContent: 'center',
    marginTop: '5%'
  },
  headerNav: {
    paddingLeft: '3%',
    paddingRight: '3%',
    marginTop: '10%'
  },
  card: {
    flex: 1,
    margin: 2,
  }
});
export default SavedRecipes;