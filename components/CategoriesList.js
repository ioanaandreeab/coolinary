import React from 'react';
import { View, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { Card, Layout, Text } from '@ui-kitten/components';
import { withNavigation } from 'react-navigation';


const CategoriesList = (props) => {
  const renderCardHeader = (url) => (
    <ImageBackground
      style={{ height: 128 }}
      source={{ uri: url }}
    />
  );
  const openRecipesList = (category) => {
    // console.log('aici', props.navigation, category)
    // props.navigation.navigate('Recipes', { categoryName: category.strCategory })
    props.navigation.navigate('Recipes', { screen: 'Recipes', params: { categoryName: category.strCategory } });

  }

  return (
    <ScrollView>
      <View>
        <Layout style={styles.topContainer} level='1'>
          <Text category='h2'>Categories</Text>
          {props.categories.length > 0 && props.categories.map((category, index) => (
            <Card key={index} style={styles.card} header={() => renderCardHeader(category.strCategoryThumb)} onPress={() => openRecipesList(category)}>
              <Text category='h6'>{category.strCategory}</Text>
            </Card>
          ))}
        </Layout>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    paddingHorizontal: 8,
    justifyContent: 'center',
    marginTop: '15%'
  },
  card: {
    flex: 1,
    margin: 2,
  }
});
export default withNavigation(CategoriesList);
