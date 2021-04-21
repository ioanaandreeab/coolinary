import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import  {Icon, Text, Button, Tooltip, Layout } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IngredientCheckBox from './CheckBoxes';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import Counter from './Counter';

const RecipeDetails = (props) => {
    const [recipe, setRecipe] = React.useState({});
    const [isStarred, setStarred] = React.useState(false);
    const [tooltipVisible, setTooltipVisible] = React.useState(false);

    const [isSaving, setSaving] = React.useState(false);
    const [isLoading, setLoading] = React.useState(true);
    const infiniteAnimationIconRef = React.useRef();

    const recipeId = props.navigation.state.params.params.recipeId;
    const urlToFetch = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`

    useEffect(()=> {
      infiniteAnimationIconRef.current.startAnimation();
      getRecipe();
    },[recipeId]);

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

    const updateRecipe = async (action) => {

      if (action === 'add') {
        recipe.timesCoocked++;
      } else {
        if (recipe.timesCoocked > 0) {
          recipe.timesCoocked--;
        }
      }
     
      setSaving(true);
      await AsyncStorage.mergeItem(props.recipeId + "", JSON.stringify(recipe));
      setSaving(false)
    }

    const storeRecipe = async (value) => {
        await AsyncStorage.setItem(recipeId + "", JSON.stringify(recipe));
    }

    const getRecipe = async () => {
      try {
        const value = await AsyncStorage.getItem(recipeId + "");
        if (value !== null) {
          setRecipe(JSON.parse(value));
          setLoading(false);
          setStarred(true);
        } else {
          fetchRecipie();
          setStarred(false);
        }
      } catch (e) {
        console.error(e);
      }
    }

    const fetchRecipie = () => {
      setLoading(true);
      axios.get(urlToFetch).then(res => {
        var recipe = res.data.meals[0];
        recipe.timesCoocked = 0;
        setRecipe(recipe)
        setLoading(false);
      });
    }

    const removeRecipe = async (value) => {
      try {
        recipe.timesCoocked = 0;
        await AsyncStorage.removeItem(recipeId + "");
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
    
    const counter = () => {
      if (isStarred) {
        return (
          <Layout style={{marginTop: 5, padding: 10}} level='3'>
            <Text style={{textAlign: 'center', marginBottom: 5}} category="p2">Times coocked</Text>
            <Counter timesCoocked={recipe.timesCoocked} isDisabled={isSaving} handleClick={updateRecipe}/>
          </Layout>
        )
      }
    }

    const loadingIcon = () => (
      <Icon
        ref={infiniteAnimationIconRef}
        animationConfig={{ cycles: Infinity }}
        width={70}
        fill={'#111'} 
        height={70}
        name='loader-outline'/>
    )

    if (isLoading) {
      return (
        <View style={styles.centered}>
          {loadingIcon()}
        </View>
    
      )
    } else {
      return (
        <ScrollView > 
 
            <Image source={{uri: recipe.strMealThumb}}
                  style={styles.recipeImage} />
           <View style ={styles.titleContainer} >
             <View style={{padding: 2}}>
               <Text category="h4">{recipe.strMeal}</Text>
               <Text category="p2">{recipe.strCategory}</Text>
             </View>
             {toolTip()}
           </View>

           {counter()} 

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
    }
};

const styles = StyleSheet.create({
  centered: {
    flex:1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

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