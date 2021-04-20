import React from 'react';
import { Card, Text } from '@ui-kitten/components';
import { View, Image } from 'react-native';

const cardStyle = { 
    width: '80%'
}
const RecipeCard = (recipe) => (
    <View>
        <Card style= {cardStyle}>
        <Image
            style={styles.tinyLogo}
            source={}
        />
        </Card>
    </View>
);

export default RecipeCard;