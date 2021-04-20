import React from 'react';
import { Input } from '@ui-kitten/components';
import { View, Text } from 'react-native';

const inputStyle = { 
    width: '80%'
}
const Search = () => {
    const [ searchTerm, setSearchTerm] = React.useState('');
  
    return (
        <View>
            <Input
                style={inputStyle}
                placeholder='Search recipe..'
                value={searchTerm}
                onChangeText={nextValue => setSearchTerm(nextValue)}
            />
            <Text>{searchTerm}</Text>
        </View>
    );
  };
export default Search;
