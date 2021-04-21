import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import  {Icon, Text, Button, Tooltip } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IngredientCheckBox from './CheckBoxes';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';


const RecipeDetails = (props) => {
    const [recipe, setRecipe] = React.useState({});
    const [isStarred, setStarred] = React.useState(false);
    const [tooltipVisible, setTooltipVisible] = React.useState(false);

    const urlToFetch = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${props.recipeId}`

    useEffect(()=> {
      getRecipe();
    },[props.recipeId]);

    const toggleStarred = () => {
      setTooltipVisible(true)
      if (isStarred) {
          removeRecipe().then(() => {
            setStarred(false);
          })
      } else {
          storeRecipe().then(() => {
            setStarred(true);
          })
      } 
    }

    const storeRecipe = async (value) => {
        await AsyncStorage.setItem(props.recipeId + "", JSON.stringify(recipe));
    }

    const getRecipe = async () => {
      try {
        const value = await AsyncStorage.getItem(props.recipeId + "");
        if (value !== null) {
          setRecipe(JSON.parse(value));
          setStarred(true);
        } else {
          axios.get(urlToFetch).then(res => setRecipe(res.data.meals[0]));
          setStarred(false);
        }
      } catch (e) {
        console.error(e);
      }
    }

    const removeRecipe = async (value) => {
      try {
        await AsyncStorage.removeItem(props.recipeId + "");
      } catch (e) {
        console.error(e)
      }
    }

    const starIcon = () => (
      <Icon
        width={32}
        height={32}
        fill={'#111'} 
        name={isStarred ? 'star' : 'star-outline'} />
    );

    const renderButtonWithToolTip = () => (
      <Button
        onPress={toggleStarred}
      style={styles.button}
      appearance='ghost'
      accessoryLeft={starIcon}
      />
     
    );

    const toolTip = () => (
      <Tooltip
        anchor={renderButtonWithToolTip}
        visible={tooltipVisible}
        onBackdropPress={() => setTooltipVisible(false)}>
        {!isStarred ? 'Removed from favourites' : 'Added to favourites' }
      </Tooltip>
    );

    const ingredients = () => {
      let ingredientsWithCBArr = [];
      let i = 1;
      for (let key in recipe) {
        if (key.includes('strIngredient') && recipe[key] !== null && recipe[key] !== "" ){
          ingredientsWithCBArr.push(<IngredientCheckBox key={i} ingredient={recipe['strMeasure'+i] + " " + recipe[key]} />);
          i++;
        }
      }

      return (
        <View>
          {ingredientsWithCBArr}
        </View>
      )
    }

    return (
       <ScrollView > 
           <Image source={{uri: recipe.strMealThumb}}
                style={styles.recipeImage} />
            <View style ={styles.titleContainer} >
              <View>
                <Text style={{padding: 4}} category="h4">{recipe.strMeal}</Text>
                <Text style={{padding: 4}} category="p2">{recipe.strCategory}</Text>
              </View>
              {toolTip()}
            </View>
                
            <View style={styles.sectionContainer}> 
               <Text style={{marginBottom: 4}} category="h5">Ingredients</Text>
               {ingredients()}
            </View>

            <View style={styles.sectionContainer}> 
               <Text style={{marginBottom: 4}} category="h5">Instructions</Text>
               <Text category="p1">{recipe.strInstructions}</Text>
            </View>
            
       </ScrollView>
    );
};

const styles = StyleSheet.create({
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 15
    },  
    container: {
      marginTop: 50,
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold'
    },  
    recipeImage: {
      borderBottomLeftRadius: 20,
      borderBottomRightRadius:20,
      width: '100%',
      height: 300
    },  
    sectionContainer: {
     padding: 10
    }
  });

export default RecipeDetails