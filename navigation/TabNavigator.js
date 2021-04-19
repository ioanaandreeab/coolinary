import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Icon } from '@ui-kitten/components';

import Home from '../screens/Home';
import SavedRecipes from '../screens/SavedRecipes';
import Categories from '../screens/Categories';

const TabNavigator = createBottomTabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Icon
            name="home-outline"
            width={32}
            height={32}
            fill={focused ? '#111' : '#939393'}
          />
        )
      }
    },
    Categories: {
        screen: Categories,
        navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Icon
            name="search-outline"
            width={32}
            height={32}
            fill={focused ? '#111' : '#939393'}
          />
        )
      }
    },
    'Saved Recipes': {
        screen: SavedRecipes,
        navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Icon
            name="heart-outline"
            width={32}
            height={32}
            fill={focused ? '#111' : '#939393'}
          />
        )
      }
    }
});

export default createAppContainer(TabNavigator);