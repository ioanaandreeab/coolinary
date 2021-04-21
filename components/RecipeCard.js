import React from 'react';
import { StyleSheet, ImageBackground, } from 'react-native';
import { Card, Layout, Text } from '@ui-kitten/components';

const CategoriesList = ({ id, photoUrl, name }) => {
    const renderCardFooter = (url) => (
        <ImageBackground
            style={{ height: 128 }}
            source={{ uri: url }}
        />
    );
    return (
        <Card key={id} style={styles.card} footer={() => renderCardFooter(photoUrl)}>
            <Text category='h6'>{name}</Text>
        </Card>);

};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 2,
    }
});
export default CategoriesList;
