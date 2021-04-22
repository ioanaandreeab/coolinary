import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Icon } from '@ui-kitten/components';
import { CategoriesStackNavigator } from './CategoriesStackNavigator';
import { SavedRecipesStackNavigator } from './SavedRecipesStackNavigator';
import { HomeStackNavigator } from './HomeStackNavigator';

const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeStackNavigator,
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
    screen: CategoriesStackNavigator,
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
        <Icon
          name="search-outline"
          width={32}
          height={32}
          fill={focused ? '#111' : '#939393'}
        />
      )
    },
    headerShown: false
  },
  'Saved Recipes': {
    screen: SavedRecipesStackNavigator,
    navigationOptions: {
      title: 'Save Recipes',
      headerShown: true,
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