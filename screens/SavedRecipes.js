import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View } from 'react-native'
import { Text, Layout, Divider, Icon } from '@ui-kitten/components';
import axios from 'axios';
import _, { get } from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RecipeCard from '../components/RecipeCard'

const SavedRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const infiniteAnimationIconRef = React.useRef();

  const getAllRecipes = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      keys.filter((key) => !_.isNil(key)).forEach(key => {
        if (key !== 'undefined' || _.isNil(key)) {
          getMeal(key)
        }
      })
      setIsLoading(false)

    } catch (error) {
      console.error(error)
    }
  }

  const getMeal = (id) => {
    const urlToFetch = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`

    axios.get(urlToFetch).then(res => {
      const mealResp = res.data.meals[0];
      setRecipes(prev => [...prev, { idMeal: mealResp.idMeal, strMeal: mealResp.strMeal, strMealThumb: mealResp.strMealThumb }])
    });
  }

  useEffect(() => {
    setIsLoading(true)
    infiniteAnimationIconRef.current.startAnimation();

    setRecipes([])
    getAllRecipes();
  }, [])

  const loadingIcon = () => (
    <Icon
      ref={infiniteAnimationIconRef}
      animationConfig={{ cycles: Infinity }}
      width={70}
      fill={'#111'}
      height={70}
      name='loader-outline' />
  )
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Divider />
      {isLoading ?
        <View style={styles.centered}>
          {loadingIcon()}
        </View> :
        <ScrollView stickyHeaderIndices={[0]} >
          <Text style={styles.headerNav} category="h5">Saved Recipes</Text>
          <View>
            <Layout style={styles.topContainer}>
              {recipes && recipes.map(item => <RecipeCard key={_.uniqueId()} id={item.idMeal} name={item.strMeal} photoUrl={item.strMealThumb} />)}
            </Layout >
          </View>
        </ScrollView>
      }
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
  centered: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
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