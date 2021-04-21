import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Categories from '../screens/Categories'
import Recipes from '../screens/Recipes'
import RecipeDetails from '../components/RecipeDetails';

export const CategoriesStackNavigator = createAppContainer(
    createStackNavigator({
        Categories: {
            screen: Categories,
            navigationOptions: {
                title: 'Categories',
                headerShown: true
            }
        },
        Recipes: {
            screen: Recipes,
            navigationOptions: {
                tabBarVisible: false
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