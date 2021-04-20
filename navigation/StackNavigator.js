import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Recipes from '../screens/Recipes'

export const StackNavigator = createAppContainer(
    createStackNavigator({
        Recipes: {
            screen: Recipes,
            navigationOptions: {
                headerShown: false,
            }
        }
    })
)