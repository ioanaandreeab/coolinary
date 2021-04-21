import React from 'react';
import { StyleSheet, ImageBackground, } from 'react-native';
import { Card, Layout, Text } from '@ui-kitten/components';
import { withNavigation } from 'react-navigation';

const RecipeCard = ({ id, photoUrl, name, navigation }) => {
    const openRecipe = () => {
        navigation.navigate('RecipeDetails', { screen: 'RecipeDetails', params: { recipeId: id } });
    }

    const renderCardFooter = (url) => (
        <ImageBackground
            style={{ height: 128 }}
            source={{ uri: url }}
        />
    );
    return (
        <Card key={id}
            onPress={() => openRecipe()}
            style={styles.card}
            footer={() => renderCardFooter(photoUrl)}>
            <Text category='h6'>{name}</Text>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 2,
    }
});
export default withNavigation(RecipeCard);
