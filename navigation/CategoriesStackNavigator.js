import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Categories from '../screens/Categories'
import Recipes from '../screens/Recipes'

export const CategoriesStackNavigator = createAppContainer(
    createStackNavigator({
        Categories: {
            screen: Categories,
            navigationOptions: {
                headerShown: false
            }
        },
        Recipes: {
            screen: Recipes,
            navigationOptions: {
                tabBarVisible: false
            }
        }
    })
)