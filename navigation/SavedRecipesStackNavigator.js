import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Home from '../screens/Home';
import RecipeDetails from '../components/RecipeDetails';
import SavedRecipes from '../screens/SavedRecipes';

export const SavedRecipesStackNavigator = createAppContainer(
    createStackNavigator({
        'Saved Recipes': {
            screen: SavedRecipes,
            navigationOptions: {
                headerShown: true
            }
        },
        RecipeDetails: {
            screen: RecipeDetails,
            navigationOptions: {
                tabBarVisible: false
            }
        }
    })
)