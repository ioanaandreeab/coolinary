import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Home from '../screens/Home';
import RecipeDetails from '../components/RecipeDetails';

export const HomeStackNavigator = createAppContainer(
    createStackNavigator({
        Home: {
            screen: Home
        },
        RecipeDetails: {
            screen: RecipeDetails,
            navigationOptions: {
                tabBarVisible: false
            }
        }
    })
)